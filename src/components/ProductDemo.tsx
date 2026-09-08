import React, { useState } from 'react';
import {
  Sparkles,
  User,
  Star,
  CheckCircle2,
  Clock,
  Award,
  Plus,
  Flame,
  Check,
  ShieldCheck,
  Smartphone,
  LayoutDashboard,
  Gift,
  ChevronLeft,
  Settings,
  Bell,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'parent' | 'child'>('parent');
  const [selectedChild, setSelectedChild] = useState<'sarah' | 'faisal'>('sarah');
  
  // Interactive mock state
  const [sarahPoints, setSarahPoints] = useState(185);
  const [sarahTasks, setSarahTasks] = useState([
    { id: 1, title: 'ترتيب السرير فور الاستيقاظ', pts: 15, completed: true, approved: true },
    { id: 2, title: 'قراءة قصة لمدة ٢٠ دقيقة', pts: 25, completed: true, approved: false },
    { id: 3, title: 'حل واجب لغتي كاملاً', pts: 30, completed: false, approved: false },
    { id: 4, title: 'تفريش الأسنان مرتين', pts: 10, completed: false, approved: false },
  ]);

  const [pendingApprovalNotif, setPendingApprovalNotif] = useState(true);

  // Parent approval action
  const handleApprove = (taskId: number, pts: number) => {
    setSarahTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, approved: true } : t))
    );
    setSarahPoints((p) => p + pts);
    setPendingApprovalNotif(false);
  };

  // Child completion toggle
  const handleChildToggle = (taskId: number) => {
    setSarahTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          return { ...t, completed: nextState, approved: false };
        }
        return t;
      })
    );
  };

  return (
    <section id="demo" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معاينة حية للمنتج</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-heading">
            تصميم أنيق وبسيط يلائم الآباء ويسعد الأبناء
          </h2>
          <p className="text-base sm:text-lg text-stone-400 leading-relaxed">
            واجهة احترافية متطورة للوالدين لإدارة ومتابعة المهام، وشاشة مشجعة وممتعة للطفل تجعله بطل إنجازاته.
          </p>

          {/* View Switcher Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-stone-800/90 border border-stone-700/80 shadow-inner">
            <button
              onClick={() => setActiveTab('parent')}
              id="tab-parent-view"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'parent'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>لوحة تحكم الوالدين</span>
            </button>

            <button
              onClick={() => setActiveTab('child')}
              id="tab-child-view"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'child'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>شاشة الطفل (سارة)</span>
            </button>
          </div>
        </div>

        {/* Mockup Container Frame */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-stone-950 rounded-3xl border border-stone-800 shadow-2xl overflow-hidden">
            
            {/* Top Device/Browser Bar */}
            <div className="bg-stone-900/90 border-b border-stone-800 px-6 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-xs text-stone-400 font-mono flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>app.noqati.sa/{activeTab === 'parent' ? 'parent/dashboard' : 'kids/sarah'}</span>
              </div>
              <div className="w-12 text-left text-[11px] text-stone-500 font-medium">
                {activeTab === 'parent' ? 'وضع الإدارة' : 'وضع الطفل'}
              </div>
            </div>

            {/* Inner Content depending on active tab */}
            <div className="p-4 sm:p-8 min-h-[520px] bg-stone-900/40">
              <AnimatePresence mode="wait">
                
                {/* 1. PARENT VIEW */}
                {activeTab === 'parent' ? (
                  <motion.div
                    key="parent-dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Parent Header & Child Selector */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-800">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <span>مرحباً أم سارة 🌸</span>
                          <span className="text-xs bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded-md font-normal">
                            نشاط اليوم: عالي
                          </span>
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                          تابعي إنجازات أبنائك واعتمدي المهام بلمسة واحدة
                        </p>
                      </div>

                      {/* Child Selection Pills */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedChild('sarah')}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            selectedChild === 'sarah'
                              ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                              : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          <div className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">
                            س
                          </div>
                          <span>سارة (٧ سنوات)</span>
                          <span className="text-[10px] text-amber-400">★ {sarahPoints}</span>
                        </button>

                        <button
                          onClick={() => setSelectedChild('faisal')}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            selectedChild === 'faisal'
                              ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                              : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                            ف
                          </div>
                          <span>فيصل (١٠ سنوات)</span>
                          <span className="text-[10px] text-amber-400">★ ٢٤٠</span>
                        </button>
                      </div>
                    </div>

                    {/* Pending Approval Banner */}
                    {pendingApprovalNotif && (
                      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                            <Bell className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-amber-200">
                              مهمة بانتظار اعتمادك من سارة
                            </h4>
                            <p className="text-xs text-amber-300/80">
                              سارة وضعت علامة إنجاز على: "قراءة قصة لمدة ٢٠ دقيقة" (+٢٥ نقطة)
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleApprove(2, 25)}
                          id="btn-approve-task"
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer self-end sm:self-auto"
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>اعتماد وإيداع ٢٥ نقطة</span>
                        </button>
                      </div>
                    )}

                    {/* Dashboard 2-column layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Left: Active Tasks Management (7 cols) */}
                      <div className="md:col-span-7 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-stone-200">
                            مهام سارة لهذا اليوم
                          </h4>
                          <span className="text-xs text-stone-400">
                            {sarahTasks.filter((t) => t.completed).length} من {sarahTasks.length} منجزة
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {sarahTasks.map((task) => (
                            <div
                              key={task.id}
                              className="p-3.5 rounded-xl bg-stone-800/70 border border-stone-700/70 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                    task.approved
                                      ? 'bg-emerald-500/20 text-emerald-400'
                                      : task.completed
                                      ? 'bg-amber-500/20 text-amber-400'
                                      : 'bg-stone-700 text-stone-400'
                                  }`}
                                >
                                  {task.approved ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                  ) : task.completed ? (
                                    <Clock className="w-4 h-4" />
                                  ) : (
                                    <span className="w-2 h-2 rounded-full bg-stone-500" />
                                  )}
                                </div>
                                <div>
                                  <span
                                    className={`text-xs sm:text-sm font-semibold block ${
                                      task.approved ? 'text-stone-400 line-through' : 'text-stone-200'
                                    }`}
                                  >
                                    {task.title}
                                  </span>
                                  <span className="text-[11px] text-stone-400">
                                    {task.approved
                                      ? 'معتمدة وتم احتساب النقاط'
                                      : task.completed
                                      ? 'أنجزتها سارة وبانتظار اعتمادك'
                                      : 'مهمة قيد الانتظار'}
                                  </span>
                                </div>
                              </div>

                              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-stone-700/80 text-amber-300">
                                +{task.pts} نقطة
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Quick Stats & Reward Store (5 cols) */}
                      <div className="md:col-span-5 space-y-4">
                        
                        {/* Weekly Streak Box */}
                        <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-stone-400 font-medium">سلسلة الالتزام (Streak)</span>
                            <div className="flex items-center gap-1 text-orange-400 font-bold text-xs">
                              <Flame className="w-4 h-4 fill-orange-400" />
                              <span>٥ أيام متتالية!</span>
                            </div>
                          </div>
                          <div className="flex justify-between gap-1.5">
                            {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(
                              (day, i) => (
                                <div key={day} className="flex flex-col items-center gap-1 flex-1">
                                  <div
                                    className={`w-full h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                                      i < 5
                                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                                        : 'bg-stone-700/50 text-stone-500'
                                    }`}
                                  >
                                    {i < 5 ? '✓' : '-'}
                                  </div>
                                  <span className="text-[9px] text-stone-500">{day[0]}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Active Reward Target */}
                        <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-stone-400">مكافأة سارة المستهدفة</span>
                            <Award className="w-4 h-4 text-amber-400" />
                          </div>
                          <h5 className="text-sm font-bold text-white mb-2">
                            نزهة الحديقة وركوب الدراجة 🚲
                          </h5>
                          <div className="w-full bg-stone-700 rounded-full h-2 mb-1.5 overflow-hidden">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${Math.min(100, (sarahPoints / 200) * 100)}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[11px] text-stone-400">
                            <span>رصيدها: {sarahPoints} نقطة</span>
                            <span>الهدف: ٢٠٠ نقطة</span>
                          </div>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                ) : (
                  
                  /* 2. CHILD VIEW */
                  <motion.div
                    key="child-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-md mx-auto space-y-5"
                  >
                    {/* Child Header Card */}
                    <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-5 text-white shadow-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl font-bold border border-white/30">
                          👧
                        </div>
                        <div>
                          <h4 className="text-lg font-bold font-heading">شاشة سارة ✨</h4>
                          <span className="text-xs text-orange-100 flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                            ٥ أيام التزام متتالية!
                          </span>
                        </div>
                      </div>

                      {/* Child Points Wallet */}
                      <div className="bg-white/20 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/30 text-center">
                        <span className="text-[11px] text-orange-100 block">رصيد نقاطي</span>
                        <div className="text-xl font-extrabold flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                          <span>{sarahPoints}</span>
                        </div>
                      </div>
                    </div>

                    {/* Child Reward Progress */}
                    <div className="p-4 rounded-2xl bg-stone-800/90 border border-stone-700">
                      <div className="flex justify-between items-center text-xs mb-2">
                        <span className="text-stone-300 font-bold flex items-center gap-1.5">
                          <Gift className="w-4 h-4 text-orange-400" />
                          هدفي القادم: نزهة الحديقة 🚲
                        </span>
                        <span className="text-amber-400 font-bold">
                          {200 - sarahPoints > 0 ? `باقي ${200 - sarahPoints} نقطة!` : 'تم الإنجاز 🎉'}
                        </span>
                      </div>
                      <div className="w-full bg-stone-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-orange-500 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (sarahPoints / 200) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Child Interactive Tasks List */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-stone-400 font-medium px-1">
                        <span>مهامي لليوم (اضغطي لإتمام المهمة):</span>
                        <span>{sarahTasks.filter((t) => t.completed).length}/{sarahTasks.length}</span>
                      </div>

                      {sarahTasks.map((task) => (
                        <button
                          key={task.id}
                          type="button"
                          onClick={() => handleChildToggle(task.id)}
                          className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                            task.completed
                              ? 'bg-emerald-950/30 border-emerald-700/80 text-emerald-200'
                              : 'bg-stone-800/90 border-stone-700 hover:border-orange-500/60 text-stone-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                                task.completed
                                  ? 'bg-emerald-500 text-stone-950'
                                  : 'border-2 border-stone-600 bg-stone-700/50'
                              }`}
                            >
                              {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                            </div>
                            <span
                              className={`text-sm font-semibold ${
                                task.completed ? 'line-through text-stone-400' : 'text-stone-100'
                              }`}
                            >
                              {task.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                                task.completed
                                  ? 'bg-emerald-900/60 text-emerald-300'
                                  : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                              }`}
                            >
                              {task.completed ? 'تمت! تنتظر الاعتماد' : `+${task.pts} نقطة`}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Child encouragement footer */}
                    <div className="p-3 bg-stone-800/60 rounded-xl text-center text-xs text-stone-400 border border-stone-700/50">
                      👏 أحسنتِ يا سارة! إنجاز المهام يجعلكِ فخورة ومستقلة.
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
