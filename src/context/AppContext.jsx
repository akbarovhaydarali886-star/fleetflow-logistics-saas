import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SHIPMENTS,
  FLEET_VEHICLES,
  DRIVERS,
  INVOICES,
  AUDIT_LOGS,
  MONTHLY_METRICS,
  CARGO_CATEGORY_DATA
} from '../data/mockData';
import { TRANSLATIONS } from '../i18n/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state ('dark' | 'light')
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('fleetflow_theme');
    return saved ? saved : 'dark';
  });

  // Language state ('uz' | 'en') - default to 'uz'
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('fleetflow_lang');
    return saved ? saved : 'uz';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('fleetflow_lang', lang);
  };

  // Translation helper function
  const t = (path) => {
    const keys = path.split('.');
    let current = TRANSLATIONS[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // fallback to English
        let fallback = TRANSLATIONS.en;
        for (const fbKey of keys) {
          if (fallback && fallback[fbKey] !== undefined) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('fleetflow_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Shipments state with localStorage cache
  const [shipments, setShipments] = useState(() => {
    const saved = localStorage.getItem('fleetflow_shipments');
    return saved ? JSON.parse(saved) : INITIAL_SHIPMENTS;
  });

  // Fleet & Drivers
  const [fleet, setFleet] = useState(FLEET_VEHICLES);
  const [drivers, setDrivers] = useState(DRIVERS);

  // Invoices
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('fleetflow_invoices');
    return saved ? JSON.parse(saved) : INVOICES;
  });

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState(AUDIT_LOGS);

  // Current authenticated user (Demo switcher: admin, dispatcher, client)
  const [currentUser, setCurrentUser] = useState({
    name: 'Sardorbek Alimov',
    role: 'admin', // 'admin' | 'dispatcher' | 'client'
    email: 'admin@fleetflow.io',
    company: 'FleetFlow Global Logistics'
  });

  // Modals state
  const [activeShipmentModal, setActiveShipmentModal] = useState(null);
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null);
  const [quickTrackId, setQuickTrackId] = useState('');

  // Save to localStorage when updated
  useEffect(() => {
    localStorage.setItem('fleetflow_shipments', JSON.stringify(shipments));
  }, [shipments]);

  useEffect(() => {
    localStorage.setItem('fleetflow_invoices', JSON.stringify(invoices));
  }, [invoices]);

  // Switch role dynamically
  const switchRole = (newRole) => {
    if (newRole === 'admin') {
      setCurrentUser({
        name: 'Sardorbek Alimov',
        role: 'admin',
        email: 'admin@fleetflow.io',
        company: 'FleetFlow Global Logistics'
      });
    } else if (newRole === 'dispatcher') {
      setCurrentUser({
        name: 'Aziza Karimova',
        role: 'dispatcher',
        email: 'dispatcher@fleetflow.io',
        company: 'FleetFlow Control Tower'
      });
    } else {
      setCurrentUser({
        name: 'Michael Schmidt',
        role: 'client',
        email: 'supply@bavaria-auto.de',
        company: 'Bavaria Auto Components GmbH'
      });
    }
  };

  // Add new shipment wizard submit
  const addShipment = (newShipmentData) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `FF-${randomNum}`;
    
    const formattedShipment = {
      id: newId,
      ...newShipmentData,
      progress: 5,
      status: 'pending',
      departureDate: new Date().toISOString().split('T')[0],
      checkpoints: [
        {
          location: `${newShipmentData.sender.city} Origin Dispatch`,
          time: 'Just now',
          status: 'current',
          note: 'Shipment created and scheduled for pickup'
        },
        {
          location: `${newShipmentData.receiver.city} Destination Hub`,
          time: newShipmentData.eta || '3 days',
          status: 'upcoming',
          note: 'Expected final delivery'
        }
      ]
    };

    setShipments(prev => [formattedShipment, ...prev]);

    // Also create corresponding invoice automatically
    const newInvoice = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      shipmentId: newId,
      clientName: newShipmentData.sender.name || 'Global Client',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      amount: newShipmentData.price || 4500,
      status: 'pending',
      service: `Freight Dispatch: ${newShipmentData.sender.city} to ${newShipmentData.receiver.city}`,
      distance: '2,400 km',
      taxRate: 12,
      paymentMethod: 'Standard Bank Invoice'
    };

    setInvoices(prev => [newInvoice, ...prev]);

    // Log action
    const newLog = {
      id: `LOG-0${auditLogs.length + 1}`,
      time: 'Just now',
      user: `${currentUser.name} (${currentUser.role})`,
      action: 'Shipment Created',
      details: `New order ${newId} initialized from ${newShipmentData.sender.city} to ${newShipmentData.receiver.city}`,
      type: 'info'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    return newId;
  };

  // Update status
  const updateShipmentStatus = (shipmentId, newStatus) => {
    setShipments(prev =>
      prev.map(item => {
        if (item.id === shipmentId) {
          const progressMap = {
            pending: 10,
            in_transit: 55,
            customs_hold: 70,
            delayed: 45,
            delivered: 100
          };
          return { ...item, status: newStatus, progress: progressMap[newStatus] || item.progress };
        }
        return item;
      })
    );

    const newLog = {
      id: `LOG-0${auditLogs.length + 1}`,
      time: 'Just now',
      user: `${currentUser.name} (${currentUser.role})`,
      action: 'Status Updated',
      details: `Shipment ${shipmentId} changed status to "${newStatus.replace('_', ' ').toUpperCase()}"`,
      type: newStatus === 'delivered' ? 'success' : newStatus === 'customs_hold' ? 'warning' : 'info'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Mark invoice paid
  const markInvoicePaid = (invoiceId) => {
    setInvoices(prev =>
      prev.map(inv => (inv.id === invoiceId ? { ...inv, status: 'paid' } : inv))
    );
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        t,
        shipments,
        fleet,
        drivers,
        invoices,
        auditLogs,
        currentUser,
        switchRole,
        addShipment,
        updateShipmentStatus,
        markInvoicePaid,
        activeShipmentModal,
        setActiveShipmentModal,
        activeInvoiceModal,
        setActiveInvoiceModal,
        quickTrackId,
        setQuickTrackId,
        MONTHLY_METRICS,
        CARGO_CATEGORY_DATA
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
