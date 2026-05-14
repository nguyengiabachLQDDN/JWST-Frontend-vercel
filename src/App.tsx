import React, { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isExploring, setIsExploring] = useState<boolean>(false);

  // Hàm xử lý tìm kiếm an toàn với TypeScript
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    
    console.log(`[Hệ thống]: Bắt đầu truy xuất dữ liệu FITS cho: ${searchQuery}`);
    setIsExploring(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* HEADER & THANH TÌM KIẾM */}
      <header className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 z-20">
        <h1 className="text-xl font-bold text-blue-400 tracking-widest">JWST SPACE EXPLORER</h1>
        <form onSubmit={handleSearch} className="flex w-1/3">
          <input
            type="text"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-l-md focus:outline-none focus:border-blue-500"
            placeholder="Khám phá thiên hà (VD: M101)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-r-md font-medium transition-colors">
            Khám phá
          </button>
        </form>
      </header>

      {/* KHÔNG GIAN LÀM VIỆC CHÍNH */}
      <main className="flex-1 flex relative">
        {/* Vùng chứa OpenSeadragon (Cách ly DOM) */}
        <section className="flex-1 relative bg-black flex items-center justify-center">
          {!isExploring ? (
            <p className="text-slate-500 italic text-lg">Vui lòng nhập tên thiên thể để nạp bản đồ vũ trụ.</p>
          ) : (
            <div id="osd-viewer" className="absolute inset-0 w-full h-full">
              {/* Plugin OpenSeadragon sẽ render các ô ảnh DZI tại đây */}
            </div>
          )}
        </section>

        {/* Sidebar Gemini */}
        {isExploring && (
          <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col z-10 shadow-2xl">
            <div className="p-4 border-b border-slate-800 font-semibold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Trợ lý Gemini AI
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="bg-slate-800/50 p-3 rounded-lg text-sm text-slate-300 border border-slate-700">
                [Hệ thống]: Giao diện OpenSeadragon đang được chuẩn bị. Bạn cần hỗ trợ phân tích thông số gì từ dữ liệu FITS này?
              </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950">
              <input
                type="text"
                placeholder="Hỏi AI về vật thể..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm focus:outline-none focus:border-emerald-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log(`[Gemini Request]: ${e.currentTarget.value}`);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}

export default App;