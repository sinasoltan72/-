import React, { useState, useCallback, useRef, useEffect } from 'react';
import { redesignImage } from './services/geminiService';

// --- Icon Components ---
const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
);

const MagicWandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.475 2.475-3 3 0 0 0 1.128 5.78A3 3 0 0 0 8.42 18.25a2.25 2.25 0 0 1 2.475-2.475.93.93 0 0 1 .472-.12h.003a.93.93 0 0 1 .472.12h.003a2.25 2.25 0 0 1 2.475 2.475 3 3 0 0 0 5.78-1.128 2.25 2.25 0 0 1 2.475-2.475 3 3 0 0 0-1.128-5.78 3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.475 2.475Z" />
    </svg>
);

const ResetIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0 8.25 8.25 0 0 0 0-11.667l-3.182-3.182m0 0-3.182 3.183m3.182-3.182L12 12.012" />
    </svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const ZoomInIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z M10.5 7.5v6m3-3h-6" />
    </svg>
);

const PenthouseLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex items-center gap-3 ${className}`}>
         <div className="bg-[#D4A017] p-2.5 rounded-md flex items-center justify-center">
            <svg className="w-8 h-8 text-[#2B2B2B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
            </svg>
        </div>
        <div>
            <span className="text-xl font-black tracking-wider text-white block leading-none">PENTHOUSE</span>
            <span className="block text-xs font-semibold text-gray-400 tracking-[0.2em] mt-1">REAL ESTATE</span>
        </div>
    </div>
);

// --- UI Helper Components ---

interface ImageFile {
  url: string;
}

const Header: React.FC = () => (
    <header className="w-full p-4 flex justify-between items-center bg-[#212121]/50 backdrop-blur-sm rounded-b-2xl shadow-lg mb-8">
        <PenthouseLogo />
        <nav className="hidden md:flex items-center gap-6 text-gray-300">
            <a href="#" className="hover:text-white transition-colors">صفحه اصلی</a>
            <a href="#" className="hover:text-white transition-colors">فروش</a>
            <a href="#" className="hover:text-white transition-colors">رهن و اجاره</a>
            <a href="#" className="hover:text-white transition-colors">پنت هاوس</a>
        </nav>
        <div className="flex items-center gap-4">
            <a href="#" className="px-4 py-2 text-sm bg-gray-200 text-gray-900 font-bold rounded-full flex items-center gap-2">
                <span>۰۱۳۳۳۳۱۳۰۳۳</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.57 22a2 2 0 0 0 1.43-.59l2.42-2.41a2 2 0 0 0 0-2.82L14.13 10a2 2 0 0 0-2.82 0L10 11.29a1 1 0 0 1-1.41 0L4.71 7.4a1 1 0 0 0-1.41 0L2 8.71a1 1 0 0 0 0 1.42L10.29 20a1 1 0 0 1 0 1.41L8.71 23a1 1 0 0 0 0 1.41l2.41 2.41a2 2 0 0 0 2.82 0L15.29 25.5a1 1 0 0 1 1.41 0l3.88 3.88a2 2 0 0 0 2.82 0l2.41-2.41a2 2 0 0 0 .59-1.43z"/></svg>
            </a>
        </div>
    </header>
);

const UploadPlaceholder: React.FC<{ 
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTakePhotoClick: () => void;
}> = ({ onImageUpload, onTakePhotoClick }) => (
  <div className="flex flex-col items-center justify-center w-full h-full p-8 border-2 border-dashed border-gray-600 rounded-2xl text-center bg-[#333333]/50 hover:bg-[#333333]/80 transition-colors duration-300">
    <UploadIcon className="w-16 h-16 text-gray-500 mb-4" />
    <h3 className="text-xl font-semibold text-gray-200">تصویر خود را اینجا بکشید و رها کنید</h3>
    <div className="flex items-center my-4 w-full max-w-xs">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="flex-shrink mx-4 text-gray-400">یا</span>
        <div className="flex-grow border-t border-gray-600"></div>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <label className="px-6 py-3 bg-[#D4A017] text-gray-900 font-bold rounded-lg cursor-pointer hover:bg-[#B8860B] transition-colors duration-300 flex items-center justify-center gap-2">
            <span>انتخاب فایل</span>
            <input type="file" className="hidden" accept="image/*" onChange={onImageUpload} />
        </label>
        <button 
            onClick={onTakePhotoClick}
            className="px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center gap-2"
            aria-label="Take a photo with camera"
        >
            <CameraIcon className="w-5 h-5" />
            <span>عکاسی با دوربین</span>
        </button>
    </div>
    <p className="text-xs text-gray-500 mt-6">PNG, JPG, WEBP</p>
  </div>
);

const ImagePreview: React.FC<{ src: string; alt: string; label: string; isLoading?: boolean }> = ({ src, alt, label, isLoading }) => (
  <div className={`relative w-full bg-[#333333] rounded-2xl overflow-hidden shadow-lg flex flex-col items-center justify-center ${isLoading ? 'min-h-[400px]' : ''}`}>
    <div className="absolute top-0 right-0 bg-black/50 text-white px-4 py-1 rounded-bl-lg text-sm font-medium z-10">{label}</div>
    {isLoading ? (
      <div className="flex flex-col items-center justify-center text-gray-400">
        <div className="w-16 h-16 border-4 border-dashed border-gray-600 border-t-[#D4A017] rounded-full animate-spin mb-4"></div>
        <p className="text-lg">در حال بازطراحی...</p>
        <p className="text-sm text-gray-500 mt-1">این فرآیند ممکن است کمی طول بکشد</p>
      </div>
    ) : (
      <img src={src} alt={alt} className="w-full h-auto" />
    )}
  </div>
);

const ROOM_TYPES = ['سالن اصلی', 'اتاق خواب', 'آشپزخانه', 'حمام و دستشویی', 'نمای بیرونی'];

const RoomTypeSelector: React.FC<{
    selectedRoom: string;
    onRoomChange: (room: string) => void;
}> = ({ selectedRoom, onRoomChange }) => (
    <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">نوع فضا را مشخص کنید</h3>
        <div className="flex flex-wrap justify-center gap-3">
            {ROOM_TYPES.map(room => (
                <button
                    key={room}
                    onClick={() => onRoomChange(room)}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        selectedRoom === room
                        ? 'bg-[#D4A017] text-gray-900 font-bold shadow-lg scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    {room}
                </button>
            ))}
        </div>
    </div>
);

const PREDEFINED_STYLES = ['مدرن و مینیمال', 'مدیترانه‌ای', 'سنتی ایرانی', 'صنعتی', 'ساحلی', 'بوهو', 'اسکاندیناوی', 'روستیک'];

const StyleSelector: React.FC<{
    selectedStyle: string;
    onStyleChange: (style: string) => void;
    customPrompt: string;
    onCustomPromptChange: (prompt: string) => void;
}> = ({ selectedStyle, onStyleChange, customPrompt, onCustomPromptChange }) => (
    <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">سبک طراحی را انتخاب کنید</h3>
        <div className="flex flex-wrap justify-center gap-3 mb-4">
            {PREDEFINED_STYLES.map(style => (
                <button
                    key={style}
                    onClick={() => onStyleChange(style)}
                    className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                        selectedStyle === style && !customPrompt
                        ? 'bg-[#D4A017] text-gray-900 font-bold shadow-lg scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    {style}
                </button>
            ))}
        </div>
        <p className="text-center text-gray-500 my-2 text-sm">یا ایده خود را بنویسید</p>
        <textarea
            value={customPrompt}
            onChange={(e) => onCustomPromptChange(e.target.value)}
            placeholder="مثلا: یک اتاق نشیمن دنج با شومینه و رنگ‌های گرم..."
            className="w-full p-3 bg-[#2B2B2B] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-colors duration-300 text-gray-200 placeholder-gray-500"
            rows={2}
        />
    </div>
);

interface AdditionalOptions {
    furnished: boolean;
    chandelier: boolean;
    plants: boolean;
    curtains: boolean;
    carpet: boolean;
    artwork: boolean;
}

const AdditionalOptionsSelector: React.FC<{
    options: AdditionalOptions;
    onOptionChange: (option: keyof AdditionalOptions) => void;
}> = ({ options, onOptionChange }) => {
    const optionLabels: Record<keyof AdditionalOptions, string> = {
        furnished: 'مبلمان کامل',
        chandelier: 'دارای لوستر',
        plants: 'دارای گل و گیاه',
        curtains: 'دارای پرده',
        carpet: 'دارای فرش',
        artwork: 'دارای تابلو هنری',
    };

    return (
        <div className="w-full mt-6 border-t border-gray-700 pt-6">
            <h4 className="text-md font-semibold text-gray-300 mb-4 text-center">جزئیات بیشتر را اضافه کنید</h4>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                {(Object.keys(options) as Array<keyof AdditionalOptions>).map(optionKey => (
                     <label key={optionKey} className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={options[optionKey]}
                            onChange={() => onOptionChange(optionKey)}
                            className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-gray-500 rounded-md flex items-center justify-center transition-all duration-300 group-hover:border-[#D4A017] peer-checked:bg-[#D4A017] peer-checked:border-[#D4A017]">
                           <svg className="w-3 h-3 text-gray-900 hidden peer-checked:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{optionLabels[optionKey]}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

const CameraView: React.FC<{
    onCapture: (imageDataUrl: string) => void;
    onCancel: () => void;
}> = ({ onCapture, onCancel }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mediaStream: MediaStream;
        const startCamera = async () => {
            try {
                mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: "environment" } 
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
                setStream(mediaStream);
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("دسترسی به دوربین امکان‌پذیر نیست. لطفا مطمئن شوید که دسترسی لازم را به این برنامه داده‌اید.");
            }
        };

        if (!capturedImage) {
            startCamera();
        }

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [capturedImage]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current && stream) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if(context) {
              context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
              const imageDataUrl = canvas.toDataURL('image/jpeg');
              setCapturedImage(imageDataUrl);
              stream.getTracks().forEach(track => track.stop());
              setStream(null);
            }
        }
    };

    const handleRetake = () => {
        setCapturedImage(null);
        setError(null);
    };

    const handleUsePhoto = () => {
        if (capturedImage) {
            onCapture(capturedImage);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 md:p-4" role="dialog" aria-modal="true">
            <div className="relative flex flex-col w-full h-full bg-[#2B2B2B] md:max-w-4xl md:h-auto md:rounded-2xl md:shadow-2xl overflow-hidden">
                {error ? (
                     <div className="p-8 text-center text-red-400 flex flex-col justify-center items-center h-full">
                         <p className="mb-4">{error}</p>
                         <button onClick={onCancel} className="px-6 py-2 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition-colors">
                             بازگشت
                         </button>
                     </div>
                ) : (
                    <>
                        <div className="relative flex-1 w-full bg-black flex items-center justify-center">
                            <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-contain ${capturedImage ? 'hidden' : 'block'}`} />
                            {capturedImage && <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />}
                            <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex justify-center gap-4">
                            {!capturedImage ? (
                                 <button onClick={handleCapture} className="w-16 h-16 bg-white rounded-full border-4 border-gray-400 hover:border-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition-all duration-200" aria-label="Capture photo"></button>
                            ) : (
                                <>
                                    <button onClick={handleUsePhoto} className="px-6 py-3 bg-[#D4A017] text-gray-900 font-bold rounded-lg hover:bg-[#B8860B] transition-colors">استفاده از عکس</button>
                                    <button onClick={handleRetake} className="px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition-colors">گرفتن مجدد</button>
                                </>
                            )}
                        </div>
                         <button onClick={onCancel} className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors flex items-center justify-center z-10" aria-label="Close camera">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                         </button>
                    </>
                )}
            </div>
        </div>
    );
};

const ZoomedImageView: React.FC<{ src: string; onClose: () => void; }> = ({ src, onClose }) => (
    <div 
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
    >
        <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
             <img src={src} alt="Zoomed redesigned interior" className="w-full h-full object-contain rounded-lg shadow-2xl" />
             <button 
                onClick={onClose} 
                className="absolute -top-2 -right-2 md:top-2 md:right-2 w-10 h-10 bg-white/20 rounded-full text-white hover:bg-white/40 transition-colors flex items-center justify-center z-10 backdrop-blur-sm" 
                aria-label="Close zoomed view"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
        </div>
    </div>
);


// --- Main App Component ---

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [redesignedImage, setRedesignedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const [roomType, setRoomType] = useState<string>(ROOM_TYPES[0]);
  const [selectedStyle, setSelectedStyle] = useState<string>(PREDEFINED_STYLES[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
    furnished: false,
    chandelier: false,
    plants: false,
    curtains: false,
    carpet: false,
    artwork: false,
  });


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setOriginalImage({ url: reader.result as string });
        setRedesignedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapturePhoto = (imageDataUrl: string) => {
    setOriginalImage({ url: imageDataUrl });
    setRedesignedImage(null);
    setError(null);
    setIsCameraOpen(false);
  };
  
  const handleRedesign = useCallback(async () => {
    if (!originalImage) return;

    setIsLoading(true);
    setError(null);
    setRedesignedImage(null);

    let finalPrompt = customPrompt.trim() 
      ? customPrompt 
      : `این ${roomType} را به سبکی ${selectedStyle} بازطراحی کن.`;

    const additions = [];
    if (additionalOptions.furnished) additions.push('کاملا مبلمان شده باشد');
    if (additionalOptions.chandelier) additions.push('دارای یک لوستر زیبا و متناسب با سبک باشد');
    if (additionalOptions.plants) additions.push('شامل گل و گیاهان طبیعی باشد');
    if (additionalOptions.curtains) additions.push('دارای پرده های مناسب باشد');
    if (additionalOptions.carpet) additions.push('دارای فرش باشد');
    if (additionalOptions.artwork) additions.push('شامل تابلوهای هنری روی دیوارها باشد');

    if (additions.length > 0) {
      finalPrompt += ` اطمینان حاصل کن که فضا ${additions.join(' و ')}.`;
    }
    
    finalPrompt += ' فقط تصویر بازطراحی شده را برگردان و هیچ متن اضافه ای تولید نکن.';

    try {
      const result = await redesignImage(originalImage.url, finalPrompt);
      setRedesignedImage(result.imageUrl);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'یک خطای ناشناخته رخ داد.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle, customPrompt, additionalOptions, roomType]);

  const handleReset = () => {
    setOriginalImage(null);
    setRedesignedImage(null);
    setError(null);
    setIsLoading(false);
    setRoomType(ROOM_TYPES[0]);
    setSelectedStyle(PREDEFINED_STYLES[0]);
    setCustomPrompt('');
    setAdditionalOptions({
        furnished: false,
        chandelier: false,
        plants: false,
        curtains: false,
        carpet: false,
        artwork: false,
    });
  };

  const handleDownload = () => {
    if (!redesignedImage) return;
    const link = document.createElement('a');
    link.href = redesignedImage;
    link.download = `penthouse-design-${roomType.replace(' ','-')}-${selectedStyle.replace(' ','-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleStyleChange = (style: string) => {
      setSelectedStyle(style);
      setCustomPrompt('');
  }
  
  const handleCustomPromptChange = (prompt: string) => {
      setCustomPrompt(prompt);
  }

  const handleOptionChange = (option: keyof AdditionalOptions) => {
    setAdditionalOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div className="min-h-screen bg-[#2B2B2B] text-gray-200 flex flex-col p-4 sm:p-6 lg:p-8">
      {isCameraOpen && <CameraView onCapture={handleCapturePhoto} onCancel={() => setIsCameraOpen(false)} />}
      
      {isZoomed && redesignedImage && (
        <ZoomedImageView src={redesignedImage} onClose={() => setIsZoomed(false)} />
      )}

      <div className={isCameraOpen ? 'hidden' : 'flex flex-col flex-1'}>
        <Header />
        <main className="flex-grow flex flex-col items-center">
          {!originalImage ? (
            <div className="w-full max-w-2xl mt-10">
              <h1 className="text-4xl sm:text-5xl font-black text-center text-white mb-4">طراح داخلی هوشمند</h1>
              <p className="mt-2 text-lg text-gray-400 text-center mb-8">فضای خود را با قدرت هوش مصنوعی به سبک دلخواه خود تبدیل کنید</p>
              <UploadPlaceholder onImageUpload={handleImageUpload} onTakePhotoClick={() => setIsCameraOpen(true)} />
            </div>
          ) : (
            <div className="w-full max-w-7xl flex flex-col items-center">
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 w-full max-w-4xl text-center" role="alert">
                  <strong className="font-bold">خطا: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <ImagePreview src={originalImage.url} alt="Original Interior" label="طرح اصلی" />
                {redesignedImage ? (
                  <div className="relative group cursor-zoom-in" onClick={() => setIsZoomed(true)}>
                    <ImagePreview src={redesignedImage} alt="Redesigned Interior" label="طرح جدید" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl pointer-events-none">
                        <ZoomInIcon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                ) : (
                  <ImagePreview src="" alt="" label="طرح جدید" isLoading={isLoading} />
                )}
              </div>

              <div className="w-full max-w-4xl p-6 bg-[#333333]/50 rounded-2xl border border-gray-700 mt-8">
                  <RoomTypeSelector
                      selectedRoom={roomType}
                      onRoomChange={setRoomType}
                  />

                  <div className="w-full my-6 border-t border-gray-700"></div>

                  <StyleSelector 
                      selectedStyle={selectedStyle}
                      onStyleChange={handleStyleChange}
                      customPrompt={customPrompt}
                      onCustomPromptChange={handleCustomPromptChange}
                  />
                  
                  <AdditionalOptionsSelector 
                    options={additionalOptions}
                    onOptionChange={handleOptionChange}
                  />
                  
                  <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                    <button
                      onClick={handleRedesign}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 px-8 py-3 bg-[#D4A017] text-gray-900 font-bold rounded-lg shadow-lg hover:bg-[#B8860B] disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                      <MagicWandIcon className="w-6 h-6" />
                      <span>{isLoading ? 'در حال پردازش...' : 'بازطراحی کن'}</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      disabled={!redesignedImage || isLoading}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                      <DownloadIcon className="w-6 h-6" />
                      <span>دانلود</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300"
                    >
                      <ResetIcon className="w-6 h-6" />
                      <span>شروع مجدد</span>
                    </button>
                  </div>
              </div>
            </div>
          )}
        </main>

        <footer className="text-center text-gray-600 mt-12 text-sm">
          <p>Penthouse Real Estate | Powered by Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;