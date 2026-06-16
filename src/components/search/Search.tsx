import React, { useState } from 'react'
import { Search as SearchIcon, MessageSquare, FolderOpen, ArrowLeft, Download, Image as ImageIcon, Play } from 'lucide-react'

interface SearchProps {
  onClose?: () => void
}

interface MessageResult {
  id: number
  sender: string
  avatar: string
  tag: string
  tagColor: string
  time: string
  message: string
  attachment?: string
}

interface MediaFile {
  id: number
  type: string
  name: string
  thumbnail: string
  gradient?: string
  icon?: string
  query?: string
}

interface DocumentFile {
  id: number
  name: string
  type: string
  size: string
  modifiedDate: string
  query?: string
}

export const Search: React.FC<SearchProps> = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [tempQuery, setTempQuery] = useState('')
  const [searchResults, setSearchResults] = useState<MessageResult[]>([])
  const [mediaResults, setMediaResults] = useState<MediaFile[]>([])
  const [documentResults, setDocumentResults] = useState<DocumentFile[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchMode, setSearchMode] = useState<'initial' | 'messages' | 'files'>('initial')
  const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos' | 'documents' | 'links'>('all')

  // Mock data for search results
  const mockMessageResults: MessageResult[] = [
    {
      id: 1,
      sender: 'Phạm Văn Hùng',
      avatar: 'PH',
      tag: '#marketing-strategy',
      tagColor: 'text-purple-600',
      time: 'Oct 12, 10:45 AM',
      message: "Hey team, I've just uploaded the final project proposal for the Q4 campaign. Please review the budget section specifically before our sync later today.",
      attachment: '📎 Q4_Proposal_v2.pdf',
    },
    {
      id: 2,
      sender: 'Phùng Văn Duy',
      avatar: 'PV',
      tag: 'Direct Message',
      tagColor: 'text-blue-600',
      time: 'Oct 11, 4:20 PM',
      message: "About the project proposal, I think we need to adjust the timeline for the development phase. The current estimate seems a bit optimistic.",
    },
    {
      id: 3,
      sender: 'Lê Quý Dương',
      avatar: 'LQ',
      tag: '#product-launch',
      tagColor: 'text-orange-600',
      time: 'Oct 10, 09:15 AM',
      message: 'Has anyone seen the project proposal that was shared in the leadership channel? I need to cross-reference some figures for the slide deck.',
    },
    {
      id: 4,
      sender: 'Phạm Ngọc Bách',
      avatar: 'PNB',
      tag: '#development',
      tagColor: 'text-green-600',
      time: 'Oct 9, 2:30 PM',
      message: 'I reviewed the project proposal and it looks comprehensive. The timeline seems reasonable for our team capacity.',
      attachment: '📎 Review_Notes.docx',
    },
    {
      id: 5,
      sender: 'Phạm Ngọc Bách',
      avatar: 'PNB',
      tag: 'Direct Message',
      tagColor: 'text-blue-600',
      time: 'Oct 9, 10:15 AM',
      message: 'Can you send me the latest project proposal? I need it for the client presentation tomorrow.',
    },
    {
      id: 6,
      sender: 'Trần Thị Hoa',
      avatar: 'TTH',
      tag: '#design-team',
      tagColor: 'text-pink-600',
      time: 'Oct 8, 3:45 PM',
      message: 'The design mockups are ready. I will incorporate feedback from the project proposal review meeting.',
      attachment: '📎 Design_Mockups_v3.fig',
    },
    {
      id: 7,
      sender: 'Nguyễn Minh Tuấn',
      avatar: 'NMT',
      tag: '#qa-testing',
      tagColor: 'text-red-600',
      time: 'Oct 8, 1:20 PM',
      message: 'Testing plan for the project is almost complete. Based on the project proposal, we should focus on edge cases.',
    },
    {
      id: 8,
      sender: 'Phạm Ngọc Bách',
      avatar: 'PNB',
      tag: '#dev-updates',
      tagColor: 'text-green-600',
      time: 'Oct 7, 11:00 AM',
      message: 'Backend API implementation completed as per the project proposal specifications. All endpoints tested and documented.',
      attachment: '📎 API_Documentation.md',
    },
    {
      id: 9,
      sender: 'Võ Thị Linh',
      avatar: 'VTL',
      tag: 'Direct Message',
      tagColor: 'text-blue-600',
      time: 'Oct 6, 5:30 PM',
      message: 'The project proposal budget allocation seems tight. Can we discuss optimization opportunities?',
    },
    {
      id: 10,
      sender: 'Hoàng Văn Nam',
      avatar: 'HVN',
      tag: '#finance',
      tagColor: 'text-yellow-600',
      time: 'Oct 5, 9:00 AM',
      message: 'Finance review of the project proposal completed. Please see attached breakdown for approval.',
      attachment: '📎 Budget_Breakdown.xlsx',
    },
    {
      id: 11,
      sender: 'Phạm Ngọc Bách',
      avatar: 'PNB',
      tag: '#architecture',
      tagColor: 'text-indigo-600',
      time: 'Oct 4, 4:15 PM',
      message: 'Architecture diagram for the project has been finalized following the proposal guidelines.',
      attachment: '📎 Architecture.png',
    },
    {
      id: 12,
      sender: 'Đinh Quang Huy',
      avatar: 'DQH',
      tag: '#devops',
      tagColor: 'text-cyan-600',
      time: 'Oct 4, 2:00 PM',
      message: 'Infrastructure setup for project proposal deployment is ready. All servers configured and tested.',
    },
    {
      id: 13,
      sender: 'Lưu Thị Mai',
      avatar: 'LTM',
      tag: '#documentation',
      tagColor: 'text-slate-600',
      time: 'Oct 3, 10:30 AM',
      message: 'Technical documentation for the project is progressing well. Following the proposal structure.',
      attachment: '📎 Tech_Docs_Draft.pdf',
    },
    {
      id: 14,
      sender: 'Phạm Ngọc Bách',
      avatar: 'PNB',
      tag: '#client-updates',
      tagColor: 'text-teal-600',
      time: 'Oct 2, 3:45 PM',
      message: 'Client presentation went well. They approved the project proposal with minor adjustments to timeline.',
    },
    {
      id: 15,
      sender: 'Trương Văn Sơn',
      avatar: 'TVS',
      tag: 'Direct Message',
      tagColor: 'text-blue-600',
      time: 'Oct 1, 1:15 PM',
      message: 'The project proposal is looking good. Shall we schedule the kickoff meeting for next week?',
    },
    {
      id: 16,
      sender: 'Phạm Ngọc Bách',
      avatar: 'PNB',
      tag: '#team-sync',
      tagColor: 'text-amber-600',
      time: 'Sep 30, 10:00 AM',
      message: 'Team sync on project proposal status - all modules on track for delivery. Great work everyone!',
    },
    {
      id: 17,
      sender: 'Ngô Tiến Duy',
      avatar: 'NTD',
      tag: '#security',
      tagColor: 'text-rose-600',
      time: 'Sep 29, 4:30 PM',
      message: 'Security audit for the project has been completed. The proposal security requirements are met.',
      attachment: '📎 Security_Report.pdf',
    },
    {
      id: 18,
      sender: 'Phạm Văn Hùng',
      avatar: 'PH',
      tag: '#marketing-strategy',
      tagColor: 'text-purple-600',
      time: 'Sep 28, 2:00 PM',
      message: 'Marketing campaign outline based on project proposal is ready. Launch scheduled for next month.',
    },
    {
      id: 19,
      sender: 'Phạm Ngọc Bách',
      avatar: 'PNB',
      tag: 'Direct Message',
      tagColor: 'text-blue-600',
      time: 'Sep 27, 11:30 AM',
      message: 'Thanks for the feedback on the project proposal. I have updated the document with your suggestions.',
    },
    {
      id: 20,
      sender: 'Đặng Minh Châu',
      avatar: 'DMC',
      tag: '#hr-training',
      tagColor: 'text-fuchsia-600',
      time: 'Sep 26, 9:00 AM',
      message: 'Training plan for the project team is aligned with the proposal milestones.',
      attachment: '📎 Training_Schedule.xlsx',
    },
    {
      id: 21,
      sender: 'Phạm Ngọc Bách',
      avatar: 'PNB',
      tag: '#performance',
      tagColor: 'text-lime-600',
      time: 'Sep 25, 3:30 PM',
      message: 'Performance benchmarks show the system meets all project proposal requirements. Excellent optimization work!',
    },
    {
      id: 22,
      sender: 'Cao Văn Quý',
      avatar: 'CVQ',
      tag: 'Direct Message',
      tagColor: 'text-blue-600',
      time: 'Sep 24, 12:00 PM',
      message: 'Looking forward to seeing the project proposal implementation. When is the alpha release?',
    },
    {
      id: 23,
      sender: 'Phạm Ngọc Bách',
      avatar: 'PNB',
      tag: '#beta-testing',
      tagColor: 'text-violet-600',
      time: 'Sep 23, 10:15 AM',
      message: 'Beta version ready for testing. All features from the project proposal are implemented.',
      attachment: '📎 Beta_Release_Notes.txt',
    },
    {
      id: 24,
      sender: 'Lê Thị Yến',
      avatar: 'LTY',
      tag: '#support',
      tagColor: 'text-sky-600',
      time: 'Sep 22, 2:45 PM',
      message: 'Support team is prepared for launch. Documentation updated per project proposal requirements.',
    },
  ]

  // Mock data for recent files
  const mockRecentMediaFiles: MediaFile[] = [
    {
      id: 101,
      type: 'image',
      name: 'Team_Photo_2024.jpg',
      thumbnail: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=500&auto=format&fit=crop&q=60',
      icon: 'image'
    },
    {
      id: 102,
      type: 'video',
      name: 'Meeting_Recording_Latest.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60',
      icon: 'play'
    },
    {
      id: 103,
      type: 'image',
      name: 'Dashboard_UI.png',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60',
      icon: 'image'
    },
    { id: 104, type: 'image', name: 'Product_Screenshot.png', thumbnail: '', icon: 'image' },
    { id: 105, type: 'video', name: 'Demo_Video.mp4', thumbnail: '', icon: 'play' },
    { id: 106, type: 'image', name: 'Design_Concept.jpg', thumbnail: '', icon: 'image' },
    { id: 107, type: 'image', name: 'Wireframe_v3.png', thumbnail: '', icon: 'image' },
    { id: 108, type: 'video', name: 'Tutorial_Guide.webm', thumbnail: '', icon: 'play' },
    { id: 109, type: 'image', name: 'Analytics_Chart.png', thumbnail: '', icon: 'image' },
    { id: 110, type: 'image', name: 'Logo_Design.svg', thumbnail: '', icon: 'image' },
    { id: 111, type: 'video', name: 'Product_Tour.mp4', thumbnail: '', icon: 'play' },
    { id: 112, type: 'image', name: 'User_Flow_Diagram.jpg', thumbnail: '', icon: 'image' },
  ]

  // Mock data for media files
  const mockAllMediaFiles: MediaFile[] = [
    { id: 1, type: 'image', name: 'Design_Mockup_1.png', thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=60', icon: 'image', query: 'project' },
    { id: 2, type: 'image', name: 'UI_Design.png', thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&auto=format&fit=crop&q=60', icon: 'image', query: 'project' },
    { id: 3, type: 'image', name: 'Dashboard_Preview.png', thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60', icon: 'image', query: 'project' },
    { id: 4, type: 'video', name: 'Project_Demo.mp4', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60', icon: 'play', query: 'project' },
    { id: 5, type: 'video', name: 'Launch_Presentation.mov', thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60', icon: 'play', query: 'launch' },
    { id: 6, type: 'image', name: 'Architecture_Diagram.png', thumbnail: 'https://images.unsplash.com/photo-1503387762-592dedbd82d2?w=500&auto=format&fit=crop&q=60', icon: 'image', query: 'project' },
    { id: 7, type: 'image', name: 'Wireframe.jpg', thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60', icon: 'image', query: 'project' },
    { id: 8, type: 'video', name: 'Tutorial.webm', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60', icon: 'play', query: 'project' },
  ]

  // Mock data for documents
  const mockAllDocuments: DocumentFile[] = [
    { id: 1, name: 'Project_Launch_Brief_2024.pdf', type: 'pdf', size: '1.4 MB', modifiedDate: 'Oct 12, 2023', query: 'project' },
    { id: 2, name: 'Final_Marketing_Plan_v3.docx', type: 'docx', size: '850 KB', modifiedDate: 'Oct 10, 2023', query: 'project' },
    { id: 3, name: 'Financial_Projections_Sheet.xlsx', type: 'xlsx', size: '2.2 MB', modifiedDate: 'Sep 28, 2023', query: 'project' },
    { id: 4, name: 'API_Documentation.md', type: 'md', size: '523 KB', modifiedDate: 'Oct 7, 2023', query: 'project' },
    { id: 5, name: 'Q4_Proposal_v2.pdf', type: 'pdf', size: '1.8 MB', modifiedDate: 'Oct 12, 2023', query: 'project' },
    { id: 6, name: 'Design_Mockups_v3.fig', type: 'fig', size: '3.1 MB', modifiedDate: 'Oct 8, 2023', query: 'project' },
    { id: 7, name: 'Technical_Docs_Draft.pdf', type: 'pdf', size: '1.2 MB', modifiedDate: 'Oct 3, 2023', query: 'project' },
    { id: 8, name: 'Security_Report.pdf', type: 'pdf', size: '890 KB', modifiedDate: 'Sep 29, 2023', query: 'project' },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setActiveFilter('all')
    if (query.trim()) {
      setIsSearching(true)
      // Simulated search - replace with actual API call
      setTimeout(() => {
        const lowerQuery = query.toLowerCase()

        // Filter messages based on query
        const filteredMessages = mockMessageResults.filter(result =>
          result.message.toLowerCase().includes(lowerQuery) ||
          result.sender.toLowerCase().includes(lowerQuery) ||
          result.tag.toLowerCase().includes(lowerQuery) ||
          (result.attachment && result.attachment.toLowerCase().includes(lowerQuery))
        )

        // Filter media files based on query
        const filteredMedia = mockAllMediaFiles.filter(file =>
          file.name.toLowerCase().includes(lowerQuery) ||
          (file.query && file.query.toLowerCase().includes(lowerQuery))
        )

        // Filter documents based on query
        const filteredDocs = mockAllDocuments.filter(doc =>
          doc.name.toLowerCase().includes(lowerQuery) ||
          (doc.query && doc.query.toLowerCase().includes(lowerQuery))
        )

        setSearchResults(filteredMessages)
        setMediaResults(filteredMedia)
        setDocumentResults(filteredDocs)
        setIsSearching(false)
      }, 300)
    } else {
      setIsSearching(false)
      setSearchResults([])
      setMediaResults([])
      setDocumentResults([])
    }
  }

  const handleSearchClick = () => {
    // Auto-switch to messages mode when searching from initial screen
    if (searchMode === 'initial' && tempQuery.trim()) {
      setSearchMode('messages')
    }
    handleSearch(tempQuery)
  }

  const handleModeSelect = (mode: 'messages' | 'files') => {
    setSearchMode(mode)
    setSearchQuery('')
    setTempQuery('')
    setSearchResults([])
    setMediaResults([])
    setDocumentResults([])
    setActiveFilter('all')
  }

  const handleBack = () => {
    setSearchMode('initial')
    setSearchQuery('')
    setTempQuery('')
    setSearchResults([])
    setMediaResults([])
    setDocumentResults([])
    setActiveFilter('all')
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header with Back Button (visible in modes) */}
      {searchMode !== 'initial' && (
        <div className="border-b border-slate-200 px-6 py-4 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h2 className="text-lg font-semibold text-blue-600">
            {searchMode === 'messages' ? 'Tìm kiếm tin nhắn người dùng' : 'Tra cứu tệp tin'}
          </h2>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex flex-col px-6 py-8">
        {searchMode === 'initial' ? (
          <div className="flex flex-col items-center justify-start">
            {/* Header Section */}
            <div className="w-full max-w-2xl text-center mb-10">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Bạn đang tìm kiếm điều gì?</h1>
              <p className="text-sm text-slate-500">Tìm cách tìm kiếm, lập tin và tìm kiếm để tất cả các cuộc hội thoại của bạn.</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-2xl mb-10">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm hoặc tên người..."
                value={tempQuery}
                onChange={(e) => setTempQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                className="w-full pl-12 pr-32 py-3 bg-blue-50 border-2 border-blue-400 rounded-3xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Tìm kiếm
              </button>
            </div>

            {/* Suggestions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-10">
              {/* Search Private Messages Card */}
              <button
                onClick={() => handleModeSelect('messages')}
                className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-all cursor-pointer text-center active:scale-95"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                  <MessageSquare className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Tìm kiếm tin nhắn người dùng</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Tra cứu các cuộc trò chuyện trực tiếp và thảo luận trong nhóm.</p>
              </button>

              {/* Search Files Card */}
              <button
                onClick={() => handleModeSelect('files')}
                className="p-6 bg-white border border-slate-200 rounded-2xl hover:shadow-lg transition-all cursor-pointer text-center active:scale-95"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                  <FolderOpen className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Tìm kiếm tài liệu, hình ảnh...</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Nhanh chóng định vị các tệp định kèm, ảnh chụp màn hình và liên kết đã chia sẻ.</p>
              </button>
            </div>

            {/* Search Tips */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 w-full max-w-3xl flex items-start gap-4">
              <div className="flex-shrink-0 pt-0.5">
                <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-1">Mẹo tìm kiếm hiệu quả</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sử dụng từ khóa, tên người để tìm kiếm cụ thể hơn. Bạn cũng có thể tìm theo tên người dùng hoặc số điện thoại để tìm được liên hệ của bạn.
                </p>
              </div>
            </div>
          </div>
        ) : searchMode === 'messages' ? (
          // Messages Search Mode
          <div className="w-full max-w-6xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full mb-6">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tin nhắn, tệp..."
                value={tempQuery}
                onChange={(e) => setTempQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                className="w-full pl-12 pr-32 py-3 bg-blue-50 border-2 border-blue-400 rounded-3xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Tìm kiếm
              </button>
            </div>

            {/* Results Count and Clear Filters */}
            {searchQuery && searchResults.length > 0 && (
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-blue-600 font-semibold">Tìm thấy {searchResults.length} kết quả</h3>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Xóa tất cả bộ lọc</button>
              </div>
            )}

            {/* Filter Tabs - Only for file search mode */}

            {/* No content yet */}
            {!searchQuery && (
              <div className="flex flex-col items-center justify-center py-16">
                <SearchIcon className="w-16 h-16 text-slate-200 mb-4" />
                <p className="text-lg font-semibold text-slate-500 mb-2">Nhập nội dung để bắt đầu tìm kiếm</p>
                <p className="text-sm text-slate-400">Tìm kiếm qua tin nhắn, tập tin, hình ảnh và liên kết trong các cuộc trò chuyện của bạn.</p>
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin">
                  <SearchIcon className="w-8 h-8 text-slate-400" />
                </div>
              </div>
            )}

            {/* Message Results */}
            {searchQuery && !isSearching && searchResults.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Kết quả Tin nhắn ({searchResults.length})</h3>
                <div className="space-y-4 mb-6">
                  {searchResults.map((result) => (
                    <div key={result.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-600 text-sm">
                          {result.avatar}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-900">{result.sender}</span>
                              <span className={`text-xs font-medium ${result.tagColor}`}>{result.tag}</span>
                            </div>
                            <span className="text-xs text-slate-500 flex-shrink-0">{result.time}</span>
                          </div>

                          <p className="text-sm text-slate-700 mb-2 leading-relaxed">
                            {result.message}
                          </p>

                          {result.attachment && (
                            <div className="text-xs text-blue-600 font-medium">
                              {result.attachment}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No results found */}
            {searchQuery && !isSearching && searchResults.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <SearchIcon className="w-16 h-16 text-slate-200 mb-4" />
                <p className="text-lg font-semibold text-slate-500 mb-2">Không tìm thấy kết quả</p>
                <p className="text-sm text-slate-400">Hãy thử với từ khóa khác hoặc kiểm tra bộ lọc của bạn</p>
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin">
                  <SearchIcon className="w-8 h-8 text-slate-400" />
                </div>
              </div>
            )}
          </div>
        ) : (
          // Files Search Mode
          <div className="w-full max-w-6xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full mb-6">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tệp tin, hình ảnh..."
                value={tempQuery}
                onChange={(e) => setTempQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                className="w-full pl-12 pr-32 py-3 bg-blue-50 border-2 border-blue-400 rounded-3xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSearchClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Tìm kiếm
              </button>
            </div>

            {/* Results Count and Clear Filters */}
            {searchQuery && (mediaResults.length > 0 || documentResults.length > 0) && (
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-blue-600 font-semibold">Tìm thấy {mediaResults.length + documentResults.length} kết quả</h3>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Xóa tất cả bộ lọc</button>
              </div>
            )}

            {/* Filter Tabs */}
            {searchQuery && (mediaResults.length > 0 || documentResults.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  📁 Tất cả tệp
                </button>
                {mediaResults.some(m => m.type === 'image') && (
                  <button
                    onClick={() => setActiveFilter('images')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'images'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    🖼️ Hình ảnh
                  </button>
                )}
                {mediaResults.some(m => m.type === 'video') && (
                  <button
                    onClick={() => setActiveFilter('videos')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'videos'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    🎬 Video
                  </button>
                )}
                {documentResults.length > 0 && (
                  <button
                    onClick={() => setActiveFilter('documents')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeFilter === 'documents'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    📄 Tài liệu
                  </button>
                )}
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">
                  🔗 Liên kết
                </button>
              </div>
            )}

            {/* Recent Files - Show when not searching */}
            {!searchQuery && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-800 font-bold text-lg">Media Results</span>
                    <span className="text-slate-500 text-sm font-normal">({mockRecentMediaFiles.length})</span>
                  </div>
                  <button className="text-[#3b82f6] text-sm font-semibold hover:underline">View All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                  {mockRecentMediaFiles.map((file) => {
                    const hasThumbnail = file.thumbnail && file.thumbnail !== '';
                    return (
                      <div
                        key={file.id}
                        className={`flex-shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden ${hasThumbnail
                            ? 'bg-slate-100 shadow-sm border border-slate-100'
                            : 'bg-[#ecf2fe] border border-dashed border-[#ccd9f7]'
                          }`}
                      >
                        {hasThumbnail ? (
                          <>
                            <img
                              src={file.thumbnail}
                              alt={file.name}
                              className="w-full h-full object-cover rounded-2xl"
                            />
                            {file.icon === 'play' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-black/45 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                                  <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white ml-0.5" />
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-center">
                            {file.icon === 'play' ? (
                              <Play className="w-6 h-6 text-[#95b8f6]" />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-[#95b8f6]" />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No content yet */}
            {!searchQuery && (
              <div className="flex flex-col items-center justify-center py-16">
                <SearchIcon className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-lg font-semibold text-slate-800 mb-2">Nhập nội dung để bắt đầu tìm kiếm</p>
                <p className="text-sm text-slate-400 text-center px-4 max-w-md">
                  Tìm kiếm qua tin nhắn, tệp tin, hình ảnh và liên kết trong các cuộc trò chuyện của bạn.
                </p>
              </div>
            )}

            {/* Loading State */}
            {isSearching && (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin">
                  <SearchIcon className="w-8 h-8 text-slate-400" />
                </div>
              </div>
            )}

            {/* Media Results */}
            {searchQuery && !isSearching && mediaResults.length > 0 && (activeFilter === 'all' || activeFilter === 'images' || activeFilter === 'videos') && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-800 font-bold text-lg">Media Results</span>
                    <span className="text-slate-500 text-sm font-normal">({mediaResults.length})</span>
                  </div>
                  <button className="text-[#3b82f6] text-sm font-semibold hover:underline">View All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                  {mediaResults.map((file) => {
                    const hasThumbnail = file.thumbnail && file.thumbnail !== '';
                    return (
                      <div
                        key={file.id}
                        className={`flex-shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-[1.02] active:scale-95 group relative overflow-hidden ${hasThumbnail
                            ? 'bg-slate-100 shadow-sm border border-slate-100'
                            : 'bg-[#ecf2fe] border border-dashed border-[#ccd9f7]'
                          }`}
                      >
                        {hasThumbnail ? (
                          <>
                            <img
                              src={file.thumbnail}
                              alt={file.name}
                              className="w-full h-full object-cover rounded-2xl"
                            />
                            {file.icon === 'play' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-black/45 backdrop-blur-sm rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                                  <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white ml-0.5" />
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-center">
                            {file.icon === 'play' ? (
                              <Play className="w-6 h-6 text-[#95b8f6]" />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-[#95b8f6]" />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Document Results */}
            {searchQuery && !isSearching && documentResults.length > 0 && (activeFilter === 'all' || activeFilter === 'documents') && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Kết quả Tài liệu ({documentResults.length})</h3>
                  <button className="text-blue-500 text-sm font-medium hover:text-blue-600">Xem tất cả</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Tên tệp</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Kích thước</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Ngày sửa đổi</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentResults.map((doc) => (
                        <tr key={doc.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-sm text-slate-900 font-medium">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">📄</span>
                              {doc.name}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">{doc.size}</td>
                          <td className="px-4 py-3 text-sm text-slate-600">{doc.modifiedDate}</td>
                          <td className="px-4 py-3 text-right">
                            <button className="flex items-center justify-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                              Tải xuống
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* No results found */}
            {searchQuery && !isSearching && mediaResults.length === 0 && documentResults.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <SearchIcon className="w-16 h-16 text-slate-200 mb-4" />
                <p className="text-lg font-semibold text-slate-500 mb-2">Không tìm thấy kết quả</p>
                <p className="text-sm text-slate-400">Hãy thử với từ khóa khác hoặc kiểm tra bộ lọc của bạn</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

