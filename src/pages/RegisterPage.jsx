import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Truck, ShieldCheck, ArrowRight, UserCheck, Lock, Mail, 
  Sparkles, Sun, Moon, Phone, Building2, User, CheckCircle2, 
  AlertCircle, Eye, EyeOff, Check, CheckCheck 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from '../components/common/LanguageSelector';

export function RegisterPage() {
  const navigate = useNavigate();
  const { switchRole, theme, toggleTheme, t, currentUser } = useApp();

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '+998 ',
    password: '',
    confirmPassword: '',
    role: 'admin',
    fleetSize: '6 - 25',
    agreeTerms: false
  });

  // Touched state for touched-only error display
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Field change handler
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Validations
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = t('auth.errName');
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = t('auth.errName');
  }

  if (!formData.companyName.trim()) {
    errors.companyName = t('auth.errCompany');
  } else if (formData.companyName.trim().length < 2) {
    errors.companyName = t('auth.errCompany');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = t('auth.errEmail');
  } else if (!emailRegex.test(formData.email.trim())) {
    errors.email = t('auth.errEmail');
  }

  const digitsOnly = formData.phone.replace(/\D/g, '');
  if (!formData.phone.trim() || digitsOnly.length < 9) {
    errors.phone = t('auth.errPhone');
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  if (!formData.password) {
    errors.password = t('auth.errPassword');
  } else if (formData.password.length < 8 || !passwordRegex.test(formData.password)) {
    errors.password = t('auth.errPassword');
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = t('auth.errConfirmPassword');
  } else if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = t('auth.errConfirmPassword');
  }

  if (!formData.agreeTerms) {
    errors.agreeTerms = t('auth.errTerms');
  }

  // Password strength calculator
  const calculateStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strengthScore = calculateStrength(formData.password);

  const getStrengthLabel = () => {
    if (strengthScore <= 1) return { label: t('auth.weak'), color: 'text-rose-500', bar: 'w-1/3 bg-rose-500' };
    if (strengthScore <= 3) return { label: t('auth.medium'), color: 'text-amber-500', bar: 'w-2/3 bg-amber-500' };
    return { label: t('auth.strong'), color: 'text-emerald-500', bar: 'w-full bg-emerald-500' };
  };

  const strengthInfo = getStrengthLabel();

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all as touched
    setTouched({
      fullName: true,
      companyName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      agreeTerms: true
    });

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Switch active role to the registered role
      switchRole(formData.role);
      
      // Update local storage demo user
      currentUser.name = formData.fullName;
      currentUser.email = formData.email;
      currentUser.company = formData.companyName;

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/app/dashboard');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden transition-colors">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Top right language & theme switchers */}
      <div className="absolute top-6 right-6 flex items-center gap-2.5 z-20">
        <LanguageSelector align="right" />

        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}
          className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-sm"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>
      </div>

      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-3 mb-6 mt-8 sm:mt-0 group z-10">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-xl shadow-cyan-500/20 group-hover:scale-105 transition">
          FF
        </div>
        <div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition">
            FleetFlow
          </span>
          <span className="text-[10px] block font-mono text-cyan-600 dark:text-cyan-400 tracking-wider">
            {t('login.brandSub') || 'ENTERPRISE SAAS'}
          </span>
        </div>
      </Link>

      {/* Main Registration Card */}
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 my-4">
        
        {/* Success Modal / State */}
        {isSuccess ? (
          <div className="py-12 text-center animate-fade-in space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8 animate-bounce-subtle" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {t('auth.successTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              {t('auth.successDesc')}
            </p>
            <div className="flex justify-center pt-2">
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <>
            {/* Header info */}
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t('auth.registerTitle')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t('auth.registerSubtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Row 1: Full Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>{t('auth.fullName')} *</span>
                    {touched.fullName && !errors.fullName && (
                      <span className="text-emerald-500 flex items-center gap-1 text-[11px]">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Haydarali Akbarov"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none transition ${
                        touched.fullName && errors.fullName
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                          : touched.fullName && !errors.fullName
                          ? 'border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  {touched.fullName && errors.fullName && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>{t('auth.companyName')} *</span>
                    {touched.companyName && !errors.companyName && (
                      <span className="text-emerald-500 flex items-center gap-1 text-[11px]">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="SilkRoad Global Cargo Ltd"
                      value={formData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      onBlur={() => handleBlur('companyName')}
                      className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none transition ${
                        touched.companyName && errors.companyName
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                          : touched.companyName && !errors.companyName
                          ? 'border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  {touched.companyName && errors.companyName && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.companyName}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Row 2: Work Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Work Email */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>{t('auth.email')} *</span>
                    {touched.email && !errors.email && (
                      <span className="text-emerald-500 flex items-center gap-1 text-[11px]">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="founder@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none transition ${
                        touched.email && errors.email
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                          : touched.email && !errors.email
                          ? 'border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>{t('auth.phone')} *</span>
                    {touched.phone && !errors.phone && (
                      <span className="text-emerald-500 flex items-center gap-1 text-[11px]">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none transition ${
                        touched.phone && errors.phone
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                          : touched.phone && !errors.phone
                          ? 'border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Row 3: Role & Fleet Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Role in system */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('auth.roleSelect')}
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                  >
                    <option value="admin">{t('auth.roleAdmin')}</option>
                    <option value="dispatcher">{t('auth.roleDispatcher')}</option>
                    <option value="client">{t('auth.roleClient')}</option>
                  </select>
                </div>

                {/* Fleet Size */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('auth.fleetSize')}
                  </label>
                  <select
                    value={formData.fleetSize}
                    onChange={(e) => handleChange('fleetSize', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                  >
                    <option value="1 - 5">{t('auth.fleetOption1')}</option>
                    <option value="6 - 25">{t('auth.fleetOption2')}</option>
                    <option value="25+">{t('auth.fleetOption3')}</option>
                  </select>
                </div>

              </div>

              {/* Row 4: Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      {t('auth.password')} *
                    </label>
                    {formData.password && (
                      <span className={`text-[10px] font-bold ${strengthInfo.color}`}>
                        {strengthInfo.label}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 belgili parol"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      onBlur={() => handleBlur('password')}
                      className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl pl-10 pr-10 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none transition ${
                        touched.password && errors.password
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                          : touched.password && !errors.password
                          ? 'border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Strength Bar */}
                  {formData.password && (
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${strengthInfo.bar}`} />
                    </div>
                  )}

                  {touched.password && errors.password && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      {t('auth.confirmPassword')} *
                    </label>
                    {formData.confirmPassword && (
                      <span className={`text-[10px] font-bold ${formData.confirmPassword === formData.password ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {formData.confirmPassword === formData.password ? t('auth.matchPass') : t('auth.mismatchPass')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Parolni qayta tering"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      className={`w-full bg-slate-50 dark:bg-slate-950 border rounded-xl pl-10 pr-10 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none transition ${
                        touched.confirmPassword && errors.confirmPassword
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500 bg-rose-50/20'
                          : touched.confirmPassword && !errors.confirmPassword
                          ? 'border-emerald-500 focus:ring-1 focus:ring-emerald-500'
                          : 'border-slate-300 dark:border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.confirmPassword}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* Agreement checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => {
                      handleChange('agreeTerms', e.target.checked);
                      handleBlur('agreeTerms');
                    }}
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-cyan-600 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 select-none">
                    {t('auth.agreeTerms')}
                  </span>
                </label>
                {touched.agreeTerms && errors.agreeTerms && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{errors.agreeTerms}</span>
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-70 text-slate-950 font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-cyan-500/20 text-xs mt-4"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Tekshirilmoqda...</span>
                  </div>
                ) : (
                  <>
                    <span>{t('auth.btnRegister')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Back to Login link */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span>{t('auth.haveAccount')}</span>
              <Link to="/login" className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
                {t('auth.signIn')}
              </Link>
            </div>
          </>
        )}

      </div>

      {/* Footer copyright */}
      <div className="text-center text-[11px] text-slate-400 dark:text-slate-600 mb-4 z-10">
        <Link to="/" className="hover:underline mr-4">← FleetFlow Bosh Sahifa</Link>
        <span>© 2026 FleetFlow Logistics OS</span>
      </div>

    </div>
  );
}
