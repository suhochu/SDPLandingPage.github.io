import React, { useState } from 'react';

interface Results {
  originalArea: number;
  newArea: number;
  costPerPyeong: number;
  totalSavings: number;
}

// This is the single, correct URL for the Google Apps Script that handles both 'create' and 'update' actions.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9wMB6mOlFcQTL_6MPo8p7GuRBf2fqa4X5QZIMgLpOWWKgZvTiHxFBClXeT9K5v6ky/exec';

const ConsultingForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [parkingArea, setParkingArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });
  const [emailError, setEmailError] = useState('');
  const [results, setResults] = useState<Results | null>(null);
  const [consultationRequested, setConsultationRequested] = useState(false);
  const [rowId, setRowId] = useState<number | null>(null);

  const validateEmail = (emailToValidate: string) => {
    if (!emailToValidate) return false;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailToValidate).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError && validateEmail(newEmail)) {
      setEmailError('');
    }
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !validateEmail(value)) {
      setEmailError('이메일 형식이 올바르지 않습니다.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
        setEmailError('이메일 형식이 올바르지 않습니다.');
        return;
    }

    setIsCalculating(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    const now = new Date();
    formData.append('action', 'create');
    formData.append('year', String(now.getFullYear()));
    formData.append('month', String(now.getMonth() + 1));
    formData.append('day', String(now.getDate()));
    formData.append('name', name);
    formData.append('email', email);
    formData.append('parkingArea', parkingArea);
    formData.append('consultation', 'X');

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.result === 'success' && data.row) {
            setRowId(data.row); // Save the returned row ID
        } else {
           throw new Error(data.message || 'An unknown error occurred while saving to sheet.');
        }
    } catch (error) {
        console.error('Error!', error instanceof Error ? error.message : String(error));
        setMessage({ text: '데이터 저장 중 오류가 발생했습니다. 다시 시도해주세요.', type: 'error' });
    }

    // Calculate and display results
    const originalArea = parseFloat(parkingArea) || 0;
    const newArea = originalArea * 0.6;
    const costPerPyeong = 528; // Unit: 만원
    const savedArea = originalArea * 0.4;
    const totalSavings = savedArea * costPerPyeong;
    
    setResults({
        originalArea,
        newArea,
        costPerPyeong,
        totalSavings,
    });
    setIsCalculating(false);
  };

  const handleConsultationRequest = () => {
    if (!results || rowId === null) {
      setMessage({ text: '오류가 발생했습니다. 페이지를 새로고침 후 다시 시도해주세요.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('action', 'update_consultation');
    formData.append('rowId', String(rowId));

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            setConsultationRequested(true);
            setMessage({ text: '상담 요청이 성공적으로 접수되었습니다.', type: 'success' });
        } else {
            throw new Error(data.message || 'An unknown error occurred.');
        }
    })
    .catch(error => {
        console.error('Error!', error instanceof Error ? error.message : String(error));
        setMessage({ text: '상담 요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', type: 'error' });
    })
    .finally(() => {
        setLoading(false);
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="성함을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 border border-alpaka-border rounded-md w-full bg-[rgba(2,10,26,0.8)] text-alpaka-text text-base placeholder:text-alpaka-placeholder focus:outline-none focus:ring-2 focus:ring-alpaka-accent"
            required 
          />
        </div>
        <div>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className="p-4 border border-alpaka-border rounded-md w-full bg-[rgba(2,10,26,0.8)] text-alpaka-text text-base placeholder:text-alpaka-placeholder focus:outline-none focus:ring-2 focus:ring-alpaka-accent"
            required 
          />
          {emailError && <p className="text-red-500 text-sm text-right mt-1">{emailError}</p>}
        </div>
        <div>
          <input
            type="number"
            id="parkingArea"
            name="parkingArea"
            placeholder="기존 주차 면적(평)"
            value={parkingArea}
            onChange={(e) => setParkingArea(e.target.value)}
            onBlur={(e) => {
              if (parseFloat(e.target.value) === 0) {
                setParkingArea('');
              }
            }}
            step="0.1"
            min="0"
            className="p-4 border border-alpaka-border rounded-md w-full bg-[rgba(2,10,26,0.8)] text-alpaka-text text-base placeholder:text-alpaka-placeholder focus:outline-none focus:ring-2 focus:ring-alpaka-accent"
            required
          />
        </div>
        <button 
          type="submit" 
          id="submit-button"
          disabled={!name || !email || !parkingArea || !!emailError || isCalculating || !!results}
          className="bg-alpaka-accent text-alpaka-bg py-4 px-5 border-none rounded-md cursor-pointer text-lg font-bold transition-all duration-300 ease-in-out shadow-accent hover:bg-white hover:shadow-accent-button-hover disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isCalculating ? '계산 중...' : '최적화 된 주차공간 확인하기'}
        </button>
      </form>
      
      {message.text && !results && (
        <p className={`text-center mt-4 font-medium ${message.type === 'success' ? 'text-alpaka-accent' : 'text-red-500'}`}>
          {message.text}
        </p>
      )}

      {results && (
        <div className="mt-8 p-6 bg-alpaka-card-bg border border-alpaka-border rounded-xl shadow-accent-lg animate-fade-in">
          <h3 className="text-xl md:text-2xl font-orbitron text-alpaka-accent text-center mb-6">
            SDP 솔루션 적용 시 예상 절감 효과
          </h3>
          <div className="space-y-4 text-lg">
            <div className="flex justify-between items-center p-3 bg-[rgba(0,240,255,0.05)] rounded-md">
              <span className="text-alpaka-subtext">기존 주차면적</span>
              <span className="font-bold text-white">{results.originalArea.toLocaleString()} 평</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[rgba(0,240,255,0.05)] rounded-md">
              <span className="text-alpaka-subtext">SDP 솔루션 적용 후</span>
              <span className="font-bold text-white">{results.newArea.toLocaleString(undefined, { maximumFractionDigits: 1 })} 평</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[rgba(0,240,255,0.05)] rounded-md">
              <span className="text-alpaka-subtext">평당 건축비</span>
              <span className="font-bold text-white">{results.costPerPyeong.toLocaleString()} 만원</span>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-alpaka-accent">
              <div className="flex justify-between items-center text-xl">
                <span className="text-alpaka-accent font-bold">총 예상 절감액</span>
                <span className="font-bold text-alpaka-accent text-2xl text-shadow-accent">
                  {Math.round(results.totalSavings).toLocaleString()} 만원
                </span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-base text-alpaka-subtext mb-6 leading-relaxed">
              제시된 예상 절감액은 개략적인 추정치입니다.
              <br/>
              보다 정확한 절감 금액이나 구체적인 절감 방안에 대해 자세히 알고 싶으시다면,
              <br/>
              SDP 담당자와의 상담을 통해 맞춤형 분석을 받아보실 수 있습니다.
            </p>
            <button
              onClick={handleConsultationRequest}
              disabled={loading || consultationRequested}
              className="bg-alpaka-accent text-alpaka-bg py-3 px-6 border-none rounded-md cursor-pointer text-lg font-bold transition-all duration-300 ease-in-out shadow-accent hover:bg-white hover:shadow-accent-button-hover disabled:bg-gray-600 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {consultationRequested ? '상담 요청 완료' : 'SDP와 상담 요청하기'}
            </button>
            {message.text && (
              <p className={`text-center mt-4 font-medium ${message.type === 'success' ? 'text-alpaka-accent' : 'text-red-500'}`}>
                {message.text}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultingForm;