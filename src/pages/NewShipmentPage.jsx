import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, ArrowRight, ArrowLeft, Check, Box, 
  MapPin, Shield, DollarSign, Calendar, Sparkles 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function NewShipmentPage() {
  const navigate = useNavigate();
  const { addShipment, fleet, drivers, setActiveShipmentModal, t } = useApp();

  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Locations
    senderName: 'Central Logistics Terminal',
    senderCity: 'Tashkent',
    senderCountry: 'Uzbekistan',
    senderAddress: 'Sergeli Industrial Park 18',
    receiverName: 'EuroTrans Distribution GmbH',
    receiverCity: 'Berlin',
    receiverCountry: 'Germany',
    receiverAddress: 'Westhafen Hafenstrasse 10',

    // Step 2: Cargo
    cargo: 'Lithium Energy Storage Units',
    type: 'Hazardous / Temperature Controlled',
    weightKg: 6200,
    volumeM3: 24,
    declaredValue: 185000,
    priority: 'High',
    requiresColdChain: true,

    // Step 3: Carrier & Service
    carrier: 'Volvo FH Electric Reefer (V-902)',
    driver: 'Jamshid Bek',
    driverPhone: '+998 97 888 11 22',
    serviceLevel: 'Express Overland (3-4 Days)',
    eta: 'In 4 Days, 18:00',
    price: 8850
  });

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Dynamic price calculation
      if (field === 'weightKg' || field === 'serviceLevel' || field === 'requiresColdChain') {
        const baseRate = 3200;
        const weightAdd = (Number(updated.weightKg) || 1000) * 0.75;
        const coldChainAdd = updated.requiresColdChain ? 1200 : 0;
        const expressMultiplier = updated.serviceLevel.includes('Express') ? 1.3 : 1.0;
        updated.price = Math.round((baseRate + weightAdd + coldChainAdd) * expressMultiplier);
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedPayload = {
      sender: {
        name: formData.senderName,
        city: formData.senderCity,
        country: formData.senderCountry,
        address: formData.senderAddress
      },
      receiver: {
        name: formData.receiverName,
        city: formData.receiverCity,
        country: formData.receiverCountry,
        address: formData.receiverAddress
      },
      cargo: formData.cargo,
      type: formData.type,
      weight: `${formData.weightKg.toLocaleString()} kg`,
      volume: `${formData.volumeM3} m³`,
      value: `$${Number(formData.declaredValue).toLocaleString()}`,
      priority: formData.priority,
      carrier: formData.carrier,
      driver: formData.driver,
      driverPhone: formData.driverPhone,
      currentLocation: `${formData.senderCity} Loading Dock`,
      eta: formData.eta,
      price: formData.price
    };

    const newId = addShipment(formattedPayload);
    navigate('/app/shipments');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('wizard.title')}</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t('wizard.subtitle')}
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between">
          {[
            { num: 1, label: t('wizard.step1') },
            { num: 2, label: t('wizard.step2') },
            { num: 3, label: t('wizard.step3') },
            { num: 4, label: t('wizard.step4') }
          ].map((s, index) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;

            return (
              <div key={s.num} className="flex-1 flex items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : isCurrent
                      ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20 font-black'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                  </div>
                  <span className={`text-xs font-semibold hidden md:inline ${
                    isCurrent ? 'text-slate-900 dark:text-white font-bold' : isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {index < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 hidden sm:block ${
                    step > s.num ? 'bg-emerald-500/60' : 'bg-slate-200 dark:bg-slate-800'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); setStep(s => s + 1); }}>
          
          {/* STEP 1: Origin & Destination */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('wizard.step1Title')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('wizard.step1Sub')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sender */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" /> {t('wizard.senderOrigin')}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.companyEntity')}</label>
                    <input
                      type="text"
                      value={formData.senderName}
                      onChange={(e) => handleChange('senderName', e.target.value)}
                      required
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-750 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.city')}</label>
                      <input
                        type="text"
                        value={formData.senderCity}
                        onChange={(e) => handleChange('senderCity', e.target.value)}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-750 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.country')}</label>
                      <input
                        type="text"
                        value={formData.senderCountry}
                        onChange={(e) => handleChange('senderCountry', e.target.value)}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-750 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.warehouseAddress')}</label>
                    <input
                      type="text"
                      value={formData.senderAddress}
                      onChange={(e) => handleChange('senderAddress', e.target.value)}
                      required
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-750 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                {/* Receiver */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" /> {t('wizard.receiverDest')}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.companyEntity')}</label>
                    <input
                      type="text"
                      value={formData.receiverName}
                      onChange={(e) => handleChange('receiverName', e.target.value)}
                      required
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-750 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.city')}</label>
                      <input
                        type="text"
                        value={formData.receiverCity}
                        onChange={(e) => handleChange('receiverCity', e.target.value)}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-750 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.country')}</label>
                      <input
                        type="text"
                        value={formData.receiverCountry}
                        onChange={(e) => handleChange('receiverCountry', e.target.value)}
                        required
                        className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-750 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.destAddress')}</label>
                    <input
                      type="text"
                      value={formData.receiverAddress}
                      onChange={(e) => handleChange('receiverAddress', e.target.value)}
                      required
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-750 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Cargo Specifications */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('wizard.step2Title')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('wizard.step2Sub')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.cargoTitle')}</label>
                  <input
                    type="text"
                    value={formData.cargo}
                    onChange={(e) => handleChange('cargo', e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.handlingClass')}</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="General Industrial Cargo">General Industrial Cargo</option>
                    <option value="Fragile / Temperature Controlled">Fragile / Temperature Controlled</option>
                    <option value="Perishable Food Grade">Perishable Food Grade</option>
                    <option value="Hazardous / High-Value">Hazardous / High-Value</option>
                    <option value="Heavy Machinery Overweight">Heavy Machinery Overweight</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.grossWeight')}</label>
                  <input
                    type="number"
                    value={formData.weightKg}
                    onChange={(e) => handleChange('weightKg', Number(e.target.value))}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.volume')}</label>
                  <input
                    type="number"
                    value={formData.volumeM3}
                    onChange={(e) => handleChange('volumeM3', Number(e.target.value))}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.customsValue')}</label>
                  <input
                    type="number"
                    value={formData.declaredValue}
                    onChange={(e) => handleChange('declaredValue', Number(e.target.value))}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.priorityLevel')}</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Normal">{t('priority.Normal')}</option>
                    <option value="High">{t('priority.High')}</option>
                    <option value="Urgent">{t('priority.Urgent')}</option>
                  </select>
                </div>
              </div>

              {/* Special options */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">{t('wizard.requiresColdChain')}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{t('wizard.coldChainNote')}</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.requiresColdChain}
                  onChange={(e) => handleChange('requiresColdChain', e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Carrier & Rate Quote */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('wizard.step3Title')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('wizard.step3Sub')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.selectCarrier')}</label>
                  <select
                    value={formData.carrier}
                    onChange={(e) => {
                      const selectedCar = fleet.find(f => f.model.includes(e.target.value.split(' ')[0]));
                      handleChange('carrier', e.target.value);
                      if (selectedCar) {
                        handleChange('driver', selectedCar.driver);
                      }
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Volvo FH Electric Reefer (V-902)">Volvo FH Electric Reefer (V-902) • Ready</option>
                    <option value="Scania R500 Super (V-882)">Scania R500 Super (V-882) • Available</option>
                    <option value="MAN TGX 26.540 Tanker (V-118)">MAN TGX 26.540 Tanker (V-118) • Standby</option>
                    <option value="Ford Transit City (V-303)">Ford Transit City (V-303) • Regional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.assignedDriver')}</label>
                  <select
                    value={formData.driver}
                    onChange={(e) => handleChange('driver', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    {drivers.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.rating}★ - {d.experience})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.serviceLevel')}</label>
                  <select
                    value={formData.serviceLevel}
                    onChange={(e) => handleChange('serviceLevel', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Express Overland (3-4 Days)">Express Overland (3-4 Days) - High Priority</option>
                    <option value="Standard Silk Road Haul (7-8 Days)">Standard Silk Road Haul (7-8 Days) - Economical</option>
                    <option value="Direct Charter Priority (48h)">Direct Charter Priority (48h) - Dedicated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">{t('wizard.deliveryWindow')}</label>
                  <input
                    type="text"
                    value={formData.eta}
                    onChange={(e) => handleChange('eta', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Dynamic Rate Calculation Card */}
              <div className="p-6 rounded-2xl bg-cyan-50 dark:bg-gradient-to-r dark:from-cyan-950/60 dark:to-slate-950 border border-cyan-200 dark:border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> {t('wizard.b2bQuote')}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    {t('wizard.quoteCalculated')} {formData.weightKg.toLocaleString()} kg ({formData.senderCity} &rarr; {formData.receiverCity})
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-slate-900 dark:text-white font-mono">${formData.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">{t('wizard.vatIncluded')}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Dispatch */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('wizard.step4Title')}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t('wizard.step4Sub')}</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800/80">
                  <div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 uppercase">{t('shipments.colRoute')}</span>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {formData.senderCity}, {formData.senderCountry} &rarr; {formData.receiverCity}, {formData.receiverCountry}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                    {formData.serviceLevel}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">{t('wizard.cargoDesc')}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{formData.cargo}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t('wizard.weight')}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{formData.weightKg.toLocaleString()} kg</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t('wizard.driver')}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">{formData.driver}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t('wizard.rateTotal')}</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">${formData.price.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
                <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  {t('wizard.dispatchNote')}
                </span>
              </div>
            </div>
          )}

          {/* Stepper Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('wizard.btnBack')}</span>
              </button>
            ) : <div />}

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition transform hover:-translate-y-0.5"
            >
              <span>{step === 4 ? t('wizard.btnSubmit') : t('wizard.btnNext')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
