import { useRef, useState, useEffect } from 'react';
import plusIcon from '../assets/clip.png';
import arrowRight from '../assets/arrow-right.png';
import botAvatar from '../assets/bot.png';
import CardGlass from '../components/CardGlass';

export interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
    file?: string;
    timestamp: string;
}

const sampleHistory = [
    { id: 1, text: 'Apa itu JHIC dan bagaimana cara kerjanya?' },
    { id: 2, text: 'Jelaskan tentang teknologi AI terbaru' },
    { id: 3, text: 'Bagaimana cara mengoptimalkan performa web?' },
];

// Simulasi respons AI — nanti ganti dengan API call
const aiResponses = [
    'Terima kasih atas pertanyaannya! Saya akan membantu Anda dengan senang hati. Berdasarkan informasi yang saya miliki, berikut adalah penjelasan yang dapat saya berikan.',
    'Pertanyaan yang menarik! Mari kita bahas secara detail. Teknologi modern telah berkembang pesat dalam beberapa tahun terakhir, memberikan dampak signifikan di berbagai bidang.',
    'Saya mengerti apa yang Anda maksud. Berikut beberapa poin penting yang perlu diperhatikan dalam konteks ini. Pertama, pastikan Anda memahami dasar-dasarnya terlebih dahulu.',
    'Baik, saya akan mencoba menjawab pertanyaan Anda. Topik ini memang cukup kompleks, tetapi saya akan menjelaskannya dengan cara yang mudah dipahami.',
    'Itu adalah pertanyaan yang sering ditanyakan! Jawabannya tergantung pada beberapa faktor. Mari kita urai satu per satu agar lebih jelas.',
];

function getRandomAIResponse(): string {
    return aiResponses[Math.floor(Math.random() * aiResponses.length)];
}

// Komponen untuk efek typing AI
function TypingIndicator() {
    return (
        <div className='flex items-end gap-3 animate-fade-in'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20'>
                <img src={botAvatar} alt='Velo AI' className='w-5' />
            </div>
            <div className='bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-sm px-5 py-3.5'>
                <div className='flex gap-1.5'>
                    <span className='w-2 h-2 bg-blue-400 rounded-full animate-bounce-dot' style={{ animationDelay: '0ms' }} />
                    <span className='w-2 h-2 bg-blue-400 rounded-full animate-bounce-dot' style={{ animationDelay: '150ms' }} />
                    <span className='w-2 h-2 bg-blue-400 rounded-full animate-bounce-dot' style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
}

// Komponen bubble chat
function ChatBubble({
    message,
    isStreaming,
    streamedText,
}: {
    message: ChatMessage;
    isStreaming?: boolean;
    streamedText?: string;
}) {
    const isUser = message.role === 'user';

    if (isUser) {
        return (
            <div className='flex justify-end animate-slide-up'>
                <div className='max-w-[70%]'>
                    {message.file && (
                        <div className='flex justify-end mb-1'>
                            <span className='inline-flex items-center gap-1.5 text-xs bg-blue-500/20 border border-blue-400/20 text-blue-300 rounded-full px-3 py-1'>
                                📎 {message.file}
                            </span>
                        </div>
                    )}
                    <div className='bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-lg shadow-blue-600/20'>
                        <p className='text-sm leading-relaxed'>{message.content}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex items-end gap-3 animate-slide-up'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20'>
                <img src={botAvatar} alt='Velo AI' className='w-5' />
            </div>
            <div className='max-w-[70%] bg-white/[0.07] backdrop-blur-sm border border-white/10 text-gray-100 px-5 py-3.5 rounded-2xl rounded-bl-sm'>
                <p className='text-sm leading-relaxed'>
                    {isStreaming ? streamedText : message.content}
                    {isStreaming && (
                        <span className='inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-cursor-blink align-text-bottom' />
                    )}
                </p>
            </div>
        </div>
    );
}

export default function ChatBotPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isInChat, setIsInChat] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamedText, setStreamedText] = useState('');

    const chatHistory = sampleHistory;

    // Auto-scroll ke bawah saat ada pesan baru
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, streamedText]);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Simulasi streaming text dari AI
    const simulateStreaming = (fullText: string) => {
        setIsTyping(false);
        setIsStreaming(true);
        setStreamedText('');

        let index = 0;
        const chunkSize = 2; // karakter per tick
        const interval = setInterval(() => {
            index += chunkSize;
            if (index >= fullText.length) {
                setStreamedText(fullText);
                clearInterval(interval);

                // Selesai streaming → tambahkan ke messages
                setTimeout(() => {
                    setIsStreaming(false);
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: 'ai',
                            content: fullText,
                            timestamp: new Date().toISOString(),
                        },
                    ]);
                }, 100);
            } else {
                setStreamedText(fullText.slice(0, index));
            }
        }, 25);
    };

    // Kirim pesan
    const handleSend = () => {
        const text = inputValue.trim();
        if (!text && !selectedFile) return;

        const userMsg: ChatMessage = {
            role: 'user',
            content: text || '(file attached)',
            file: selectedFile?.name,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue('');
        handleRemoveFile();
        setIsInChat(true);

        // Simulasi AI thinking → streaming
        setIsTyping(true);
        const thinkTime = 800 + Math.random() * 1200;
        setTimeout(() => {
            const response = getRandomAIResponse();
            simulateStreaming(response);
        }, thinkTime);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Klik history card → kirim pertanyaan
    const handleHistoryClick = (text: string) => {
        const userMsg: ChatMessage = {
            role: 'user',
            content: text,
            timestamp: new Date().toISOString(),
        };

        setMessages([userMsg]);
        setIsInChat(true);

        // Simulasi AI thinking → streaming
        setIsTyping(true);
        const thinkTime = 800 + Math.random() * 1200;
        setTimeout(() => {
            const response = getRandomAIResponse();
            simulateStreaming(response);
        }, thinkTime);
    };

    // Truncate filename
    const truncateFileName = (name: string, maxLen = 20) => {
        if (name.length <= maxLen) return name;
        const ext = name.slice(name.lastIndexOf('.'));
        const base = name.slice(0, maxLen - ext.length - 3);
        return `${base}...${ext}`;
    };

    // AI message placeholder saat streaming (belum masuk ke messages state)
    const streamingAIMsg: ChatMessage = {
        role: 'ai',
        content: '',
        timestamp: '',
    };

    return (
        <div className='min-h-screen relative overflow-hidden flex flex-col'>
            <div className='absolute inset-0 bg-[#0B0B0B] bg-[radial-gradient(ellipse_at_center,_#101d4f_0%,_#03011c_55%)] scale-105' />

            <div className='relative z-10 flex flex-col flex-1 min-h-screen'>
                {/* Header */}
                {isInChat && (
                    <div className='flex items-center gap-3 px-6 pt-10 pb-4 border-b border-white/5 bg-[#050329]/60 backdrop-blur-md'>
                        <button
                            onClick={() => {
                                setIsInChat(false);
                                setMessages([]);
                            }}
                            className='text-white/60 hover:text-white transition text-sm'
                        >
                            ← Kembali
                        </button>
                        <div className='flex items-center gap-2'>
                            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20'>
                                <img src={botAvatar} alt='Velo AI' className='w-5' />
                            </div>
                            <div>
                                <p className='text-white text-sm font-medium'>Velo AI</p>
                                <p className='text-green-400 text-[10px]'>● Online</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main content area */}
                <div className='flex-1 flex flex-col'>
                    {!isInChat ? (
                        /* ========= WELCOME SCREEN ========= */
                        <div className='flex flex-col gap-5 justify-center items-center min-h-screen'>
                            <h1 className='text-4xl text-white'>
                                Selamat Datang Di, Velo AI
                            </h1>

                            {/* Input bar */}
                            <div className='flex h-16 w-full items-center bg-[#050329] rounded-full px-4 max-w-4xl'>
                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    accept='image/*,.pdf,.doc,.docx,.txt'
                                    className='hidden'
                                    onChange={handleFileChange}
                                />

                                <button
                                    onClick={handleFileClick}
                                    className='w-12 opacity-80 hover:bg-blue-100/20 p-3 hover:rotate-90 rounded-full transition duration-300'
                                    title='Upload file'
                                >
                                    <img src={plusIcon} alt='Upload file' />
                                </button>

                                <div className='flex-1 flex items-center gap-2 px-2 overflow-hidden'>
                                    {selectedFile && (
                                        <div className='flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full px-3 py-1 shrink-0 max-w-[200px]'>
                                            <span className='text-blue-300 text-xs truncate'>
                                                📎 {truncateFileName(selectedFile.name)}
                                            </span>
                                            <button
                                                onClick={handleRemoveFile}
                                                className='text-blue-300/70 hover:text-red-400 text-xs transition shrink-0'
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        type='text'
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder='Mau tanya apa hari ini?'
                                        className='flex-1 bg-transparent px-2 text-white outline-none placeholder:text-gray-300 min-w-0'
                                    />
                                </div>

                                <button
                                    onClick={handleSend}
                                    className='flex h-12 w-12 items-center justify-center rounded-full bg-[#0e084a] transition duration-300 hover:bg-[#352f7d]'
                                >
                                    <img
                                        src={arrowRight}
                                        alt='Kirim'
                                        className='w-5 opacity-80 mx-2'
                                    />
                                </button>
                            </div>

                            {/* History cards */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-6'>
                                {chatHistory.slice(0, 3).map((item) => (
                                    <CardGlass
                                        key={item.id}
                                        text={item.text}
                                        onClick={() => handleHistoryClick(item.text)}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* ========= CHAT VIEW ========= */
                        <>
                            {/* Messages area */}
                            <div className='flex-1 overflow-y-auto px-4 md:px-20 lg:px-40 py-6 space-y-5 scrollbar-hide'>
                                {messages.map((msg, i) => (
                                    <ChatBubble key={i} message={msg} />
                                ))}

                                {/* Typing indicator */}
                                {isTyping && <TypingIndicator />}

                                {/* Streaming AI bubble */}
                                {isStreaming && (
                                    <ChatBubble
                                        message={streamingAIMsg}
                                        isStreaming
                                        streamedText={streamedText}
                                    />
                                )}

                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat input bar (fixed bottom) */}
                            <div className='px-4 md:px-20 lg:px-40 py-4 bg-gradient-to-t from-[#03011c] via-[#03011c]/95 to-transparent'>
                                <div className='flex h-14 w-full items-center bg-[#050329] border border-white/5 rounded-full px-4 max-w-4xl mx-auto'>
                                    <input
                                        ref={fileInputRef}
                                        type='file'
                                        accept='image/*,.pdf,.doc,.docx,.txt'
                                        className='hidden'
                                        onChange={handleFileChange}
                                    />

                                    <button
                                        onClick={handleFileClick}
                                        className='w-10 opacity-80 hover:bg-blue-100/20 p-2.5 hover:rotate-90 rounded-full transition duration-300'
                                        title='Upload file'
                                    >
                                        <img src={plusIcon} alt='Upload file' />
                                    </button>

                                    <div className='flex-1 flex items-center gap-2 px-2 overflow-hidden'>
                                        {selectedFile && (
                                            <div className='flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full px-3 py-1 shrink-0 max-w-[200px]'>
                                                <span className='text-blue-300 text-xs truncate'>
                                                    📎 {truncateFileName(selectedFile.name)}
                                                </span>
                                                <button
                                                    onClick={handleRemoveFile}
                                                    className='text-blue-300/70 hover:text-red-400 text-xs transition shrink-0'
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        )}
                                        <input
                                            type='text'
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder='Ketik pesan...'
                                            className='flex-1 bg-transparent px-2 text-white outline-none placeholder:text-gray-400 min-w-0 text-sm'
                                        />
                                    </div>

                                    <button
                                        onClick={handleSend}
                                        disabled={isTyping || isStreaming}
                                        className='flex h-10 w-10 items-center justify-center rounded-full bg-[#0e084a] transition duration-300 hover:bg-[#352f7d] hover:scale-105 disabled:opacity-40 disabled:hover:scale-100'
                                    >
                                        <img
                                            src={arrowRight}
                                            alt='Kirim'
                                            className='w-4 opacity-80 mx-2'
                                        />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}