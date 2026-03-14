// components/auth/ResetOTPVerification.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function ResetOTPVerification({ email, onBack, onSuccess }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`reset-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      const prevInput = document.getElementById(`reset-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    
    pastedData.forEach((value, index) => {
      if (index < 6 && /^\d+$/.test(value)) {
        newOtp[index] = value;
      }
    });
    
    setOtp(newOtp);
    
    const lastFilledIndex = newOtp.findLastIndex(val => val !== '');
    if (lastFilledIndex < 5) {
      document.getElementById(`reset-otp-${lastFilledIndex + 1}`)?.focus();
    }
  };

// components/auth/ResetOTPVerification.jsx
// In the handleSubmit function, update the onSuccess call:

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const otpString = otp.join('');
  if (otpString.length !== 6) {
    toast.error('Invalid OTP', {
      description: 'Please enter all 6 digits'
    });
    return;
  }

  setIsSubmitting(true);
  const loadingToast = toast.loading('Verifying OTP...');

  try {
    console.log('📤 Sending password reset OTP verification for:', email);
    
    const response = await fetch('https://b2b-backend-rosy.vercel.app/api/auth/verify-reset-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp: otpString
      })
    });

    console.log('📥 Response status:', response.status);
    
    const data = await response.json();
    console.log('📥 Response data:', data);
    
    toast.dismiss(loadingToast);

    if (!response.ok) {
      console.error('❌ Verification failed:', data);
      toast.error('Verification Failed', {
        description: data.error || 'Invalid OTP'
      });
      setIsSubmitting(false);
      return;
    }

    console.log('✅ OTP verified successfully');

    toast.success('OTP Verified!', {
      description: 'Please set your new password'
    });

    // Pass the OTP back to the parent
    onSuccess(otpString);

  } catch (error) {
    console.error('❌ Network/Connection error:', error);
    toast.dismiss(loadingToast);
    toast.error('Connection Error', {
      description: 'Unable to connect to server'
    });
    setIsSubmitting(false);
  }
};

  const handleResendOTP = async () => {
    if (!canResend) return;

    const loadingToast = toast.loading('Sending new OTP...');

    try {
      const response = await fetch('https://b2b-backend-rosy.vercel.app/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error('Failed', {
          description: data.error || 'Could not resend OTP'
        });
        return;
      }

      toast.success('OTP Resent!', {
        description: 'Please check your email'
      });

      setTimer(600);
      setCanResend(false);

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Reset Code</h2>
        <p className="text-gray-600">
          We've sent a 6-digit code to<br />
          <span className="font-semibold" style={{ color: '#d9884e' }}>{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`reset-otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d9884e] focus:border-[#d9884e]"
              required
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Time remaining: <span className="font-semibold" style={{ color: '#d9884e' }}>{formatTime(timer)}</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-all font-medium"
          style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </span>
          ) : (
            'Verify OTP'
          )}
        </button>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back
          </button>
          
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend}
            className={`text-sm font-medium ${
              canResend 
                ? 'hover:underline' 
                : 'text-gray-400 cursor-not-allowed'
            }`}
            style={canResend ? { color: '#d9884e' } : {}}
          >
            Resend OTP
          </button>
        </div>
      </form>
    </motion.div>
  );
}