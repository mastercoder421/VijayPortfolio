import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';
import { openEmailComposer } from '../utils/email';
import { MagneticButton } from './MagneticButton';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    botcheck: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change if field had one
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Spam honeypot triggered
    if (formData.botcheck) {
      return;
    }

    if (!validate()) {
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
      console.warn(
        'VITE_WEB3FORMS_KEY is missing. Falling back to Gmail composer.'
      );
      openEmailComposer({
        subject: formData.subject || `Portfolio Contact from ${formData.name}`,
        body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      });
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || 'Portfolio Contact',
          message: formData.message.trim(),
          from_name: 'Portfolio Website',
          botcheck: formData.botcheck,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          botcheck: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(
          result.message || 'Something went wrong while sending your message.'
        );
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        'Network error. Please try again or reach out directly via Gmail.'
      );
      console.error('Contact form submission error:', err);
    }
  };

  const handleGmailFallback = () => {
    openEmailComposer({
      subject: formData.subject || `Portfolio Contact from ${formData.name}`,
      body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    });
  };

  const inputBaseStyle =
    'w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900/90 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-600 dark:focus:border-cyan-400 shadow-sm dark:shadow-none dark:focus:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all text-sm';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Honeypot field for bot spam prevention */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        checked={!!formData.botcheck}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            botcheck: e.target.checked ? '1' : '',
          }))
        }
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5 font-mono"
          >
            Your Name <span className="text-cyan-600 dark:text-cyan-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Vijay Maheshwari"
            disabled={status === 'sending'}
            className={`${inputBaseStyle} ${
              errors.name ? 'border-red-500/80 focus:ring-red-500' : ''
            }`}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-500 flex items-center space-x-1">
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5 font-mono"
          >
            Your Email <span className="text-cyan-600 dark:text-cyan-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            disabled={status === 'sending'}
            className={`${inputBaseStyle} ${
              errors.email ? 'border-red-500/80 focus:ring-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600 dark:text-red-500 flex items-center space-x-1">
              <span>{errors.email}</span>
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5 font-mono"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Software Development Internship / Project Inquiry"
          disabled={status === 'sending'}
          className={inputBaseStyle}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-1.5 font-mono"
        >
          Message <span className="text-cyan-600 dark:text-cyan-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Hi Vijay, I came across your portfolio and would like to connect regarding..."
          disabled={status === 'sending'}
          className={`${inputBaseStyle} ${
            errors.message ? 'border-red-500/80 focus:ring-red-500' : ''
          } resize-none`}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-600 dark:text-red-500 flex items-center space-x-1">
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Success Notification */}
      {status === 'success' && (
        <div className="flex items-center space-x-2.5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-sm shadow-sm dark:shadow-none">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>Message sent! I'll reply to your email soon.</span>
        </div>
      )}

      {/* Error Notification with Direct Gmail Fallback */}
      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-400 text-xs sm:text-sm space-y-3 shadow-sm dark:shadow-none">
          <div className="flex items-start space-x-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
            <span>{errorMessage || 'Failed to send message.'}</span>
          </div>
          <div>
            <button
              type="button"
              onClick={handleGmailFallback}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-red-100 hover:bg-red-200/80 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-800 dark:text-red-300 font-medium text-xs transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email me directly via Gmail</span>
            </button>
          </div>
        </div>
      )}

      <div className="pt-2 w-full">
        <MagneticButton
          type="submit"
          disabled={status === 'sending'}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white shadow-lg shadow-cyan-600/20 dark:shadow-cyan-500/25 hover:shadow-cyan-600/30 dark:hover:shadow-cyan-500/40 active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </MagneticButton>
      </div>
    </form>
  );
};
