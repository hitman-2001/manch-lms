<template>
  <div v-if="!isAdminRoute" class="navratri-celebration-container">
    <!-- Floating Festive Quick-Button (Bottom-Right) -->
    <transition name="pop-in">
      <div
        v-if="!isModalOpen"
        class="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40"
      >
        <button
          @click="openModal(true)"
          class="group relative flex items-center gap-2.5 bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-[0_10px_25px_rgba(220,38,38,0.4)] border border-amber-300/40 hover:scale-105 hover:shadow-[0_15px_30px_rgba(245,158,11,0.5)] active:scale-95 transition-all duration-300 cursor-pointer"
          title="Open Navratri Wishes & Celebrations"
        >
          <!-- Pulsing ambient glow -->
          <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 opacity-40 blur group-hover:opacity-80 transition duration-500 animate-pulse"></div>

          <!-- Animated Diya SVG Icon -->
          <div class="relative w-6 h-6 flex-shrink-0">
            <svg viewBox="0 0 40 40" class="w-full h-full drop-shadow-md" fill="none">
              <!-- Flame -->
              <path
                d="M20 3 C20 3, 25 12, 23 17 C21 21, 19 21, 17 17 C15 12, 20 3, 20 3 Z"
                fill="url(#diyaFlameFloat)"
                class="flame-flicker"
              />
              <!-- Flame Core -->
              <path
                d="M20 7 C20 7, 23 13, 21.5 16 C20.5 18, 19.5 18, 18.5 16 C17.5 13, 20 7, 20 7 Z"
                fill="#FFFBEB"
              />
              <!-- Diya Base -->
              <path
                d="M8 20 C8 30, 32 30, 32 20 C32 19, 8 19, 8 20 Z"
                fill="url(#diyaBaseFloat)"
              />
              <!-- Diya Rim -->
              <ellipse cx="20" cy="19.5" rx="12" ry="2.5" fill="#F59E0B" />
              <defs>
                <linearGradient id="diyaFlameFloat" x1="20" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FEF08A" />
                  <stop offset="0.5" stop-color="#F59E0B" />
                  <stop offset="1" stop-color="#DC2626" />
                </linearGradient>
                <linearGradient id="diyaBaseFloat" x1="8" y1="20" x2="32" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#D97706" />
                  <stop offset="1" stop-color="#78350F" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div class="relative flex flex-col text-left leading-tight">
            <span class="text-[10px] font-medium text-amber-200 uppercase tracking-wider">Shubh Navratri</span>
            <span class="text-xs sm:text-sm font-bold tracking-tight">Manch Classes Wishes</span>
          </div>

          <span class="relative ml-0.5 text-xs text-amber-300 group-hover:rotate-12 transition-transform">✨</span>
        </button>
      </div>
    </transition>

    <!-- Full Celebration Modal Experience -->
    <transition name="modal-fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        @keydown.esc="closeModal"
      >
        <!-- Backdrop with Blur -->
        <div
          class="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
          @click="closeModal"
        ></div>

        <!-- Animated Floating Background Sparkles -->
        <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div
            v-for="i in 18"
            :key="i"
            class="absolute festive-particle"
            :style="getParticleStyle(i)"
          ></div>
        </div>

        <!-- Main Card Container -->
        <div
          class="relative w-full max-w-xl mx-auto bg-gradient-to-br from-[#270b14] via-[#1a0a1e] to-[#0c0a1a] rounded-3xl p-6 sm:p-8 md:p-9 shadow-[0_0_60px_rgba(245,158,11,0.25)] border-2 border-amber-400/30 overflow-hidden text-center z-10 transform transition-all duration-500 scale-100"
        >
          <!-- Top Ambient Glow -->
          <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-amber-500/25 via-rose-500/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <!-- Decorative Golden Mandala Ring (Slow Rotate) -->
          <div class="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 pointer-events-none opacity-20 animate-spin-slow">
            <svg viewBox="0 0 200 200" class="w-full h-full text-amber-300" fill="currentColor">
              <path d="M100 0 L108 30 L138 22 L128 50 L158 58 L135 80 L160 100 L135 120 L158 142 L128 150 L138 178 L108 170 L100 200 L92 170 L62 178 L72 150 L42 142 L65 120 L40 100 L65 80 L42 58 L72 50 L62 22 L92 30 Z" fill-opacity="0.2" stroke="currentColor" stroke-width="1.5" fill="none" />
              <circle cx="100" cy="100" r="75" stroke="currentColor" stroke-width="1" fill="none" stroke-dasharray="4 4" />
              <circle cx="100" cy="100" r="50" stroke="currentColor" stroke-width="1.5" fill="none" />
            </svg>
          </div>

          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-white/60 hover:text-white bg-white/5 hover:bg-white/15 p-2 rounded-full transition-all border border-white/10 active:scale-90 z-20 cursor-pointer"
            aria-label="Close greeting"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Sound Mute/Unmute Toggle -->
          <button
            @click="toggleAudio"
            class="absolute top-4 left-4 text-amber-200/80 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 px-2.5 py-1.5 rounded-full transition-all border border-amber-400/20 text-xs flex items-center gap-1.5 z-20 cursor-pointer"
            :title="soundEnabled ? 'Temple Chime Enabled (Click to Mute)' : 'Temple Chime Muted (Click to Enable)'"
          >
            <span>{{ soundEnabled ? '🔔' : '🔕' }}</span>
            <span class="text-[11px] font-medium hidden sm:inline">{{ soundEnabled ? 'Chime On' : 'Chime Off' }}</span>
          </button>

          <!-- Header Badge / Sacred Emblem -->
          <div class="relative flex flex-col items-center justify-center mt-3 mb-4">
            <!-- Center Deity Crest / Trishul & Diya Combo SVG -->
            <div class="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 flex items-center justify-center">
              <!-- Radiant Halo Behind -->
              <div class="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full blur-xl opacity-50 animate-pulse"></div>

              <svg viewBox="0 0 100 100" class="w-full h-full relative z-10 drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]" fill="none">
                <!-- Trishul Motif -->
                <path
                  d="M50 8 L50 68 M40 18 C40 38, 50 48, 50 48 C50 48, 60 38, 60 18 M38 18 L32 24 M62 18 L68 24 M46 8 L50 2 L54 8"
                  stroke="url(#trishulGradModal)"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <!-- Sacred Lotus Petals Base -->
                <path
                  d="M25 68 C35 55, 45 62, 50 68 C55 62, 65 55, 75 68 C68 76, 58 75, 50 72 C42 75, 32 76, 25 68 Z"
                  fill="url(#lotusGradModal)"
                />
                <!-- Glowing Golden Diya -->
                <path
                  d="M34 76 C34 88, 66 88, 66 76 Z"
                  fill="url(#diyaBodyGradModal)"
                />
                <ellipse cx="50" cy="76" rx="16" ry="3.5" fill="#FDE68A" />
                <!-- Sacred Flame -->
                <path
                  d="M50 56 C50 56, 56 67, 54 72 C52 76, 48 76, 46 72 C44 67, 50 56, 50 56 Z"
                  fill="url(#flameGradModal)"
                  class="flame-flicker-strong"
                />
                <circle cx="50" cy="70" r="2.5" fill="#FFFFFF" />

                <defs>
                  <linearGradient id="trishulGradModal" x1="50" y1="2" x2="50" y2="68" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FDE68A" />
                    <stop offset="0.5" stop-color="#F59E0B" />
                    <stop offset="1" stop-color="#EA580C" />
                  </linearGradient>
                  <linearGradient id="lotusGradModal" x1="25" y1="55" x2="75" y2="76" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F43F5E" />
                    <stop offset="1" stop-color="#BE123C" />
                  </linearGradient>
                  <linearGradient id="diyaBodyGradModal" x1="34" y1="76" x2="66" y2="88" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#D97706" />
                    <stop offset="1" stop-color="#78350F" />
                  </linearGradient>
                  <linearGradient id="flameGradModal" x1="50" y1="56" x2="50" y2="76" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FEF08A" />
                    <stop offset="0.4" stop-color="#F59E0B" />
                    <stop offset="1" stop-color="#DC2626" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <!-- Top Religious Ribbon -->
            <div class="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-rose-500/25 to-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-semibold tracking-wider">
              <span>🔱</span>
              <span>माँ दुर्गा की असीम कृपा सदा आप पर बनी रहे</span>
              <span>🔱</span>
            </div>
          </div>

          <!-- Main Typography -->
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
            <span class="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100 bg-clip-text text-transparent drop-shadow-sm font-serif">
              ॥ शुभ नवरात्रि ॥
            </span>
          </h2>

          <h3 class="text-lg sm:text-2xl font-bold text-white mb-3">
            <span class="text-amber-300">Manch Classes</span> Wishes You A Very
            <span class="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">Happy Navratri!</span>
          </h3>

          <p class="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-5 font-normal">
            May the 9 divine days of Maa Durga bestow abundant wisdom, relentless focus, and immense strength upon our students. Let this festive season illuminate your path to victory in <strong class="text-amber-300">JEE, NEET, MSAT & Board exams</strong>!
          </p>

          <!-- 3 Divine Virtues for Aspirants -->
          <div class="grid grid-cols-3 gap-2 max-w-md mx-auto mb-6 text-[11px] sm:text-xs">
            <div class="bg-white/5 border border-amber-400/20 rounded-xl py-2 px-2 text-amber-200/90 flex items-center justify-center gap-1.5 shadow-sm">
              <span>🌟</span>
              <span class="font-medium">ज्ञान (Wisdom)</span>
            </div>
            <div class="bg-white/5 border border-amber-400/20 rounded-xl py-2 px-2 text-rose-200/90 flex items-center justify-center gap-1.5 shadow-sm">
              <span>🔥</span>
              <span class="font-medium">शक्ति (Strength)</span>
            </div>
            <div class="bg-white/5 border border-amber-400/20 rounded-xl py-2 px-2 text-amber-200/90 flex items-center justify-center gap-1.5 shadow-sm">
              <span>🏆</span>
              <span class="font-medium">विजय (Success)</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <!-- Main Confetti Trigger -->
            <button
              @click="triggerCelebration"
              class="w-full sm:w-auto relative group overflow-hidden bg-gradient-to-r from-amber-500 via-rose-600 to-amber-600 text-white font-bold px-6 py-3.5 rounded-xl shadow-[0_10px_25px_rgba(245,158,11,0.4)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.6)] active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border border-amber-300/40"
            >
              <span class="text-xl group-hover:scale-125 transition-transform">🎉</span>
              <span class="tracking-wide">Celebrate & Shower Petals</span>
              <span class="text-amber-200 group-hover:rotate-45 transition-transform">✨</span>

              <!-- Hover Glare Animation -->
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>

            <!-- Close / Continue learning button -->
            <button
              @click="closeModal"
              class="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white font-medium text-xs sm:text-sm border border-white/15 transition-all active:scale-95 cursor-pointer"
            >
              Continue to Website
            </button>
          </div>

          <!-- Footer Blessing Quote -->
          <div class="mt-6 pt-4 border-t border-white/10 text-center">
            <p class="text-[11px] sm:text-xs text-amber-300/75 italic">
              "या देवी सर्वभूतेषु शक्ति-रूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥"
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import confetti from 'canvas-confetti'

export default {
  name: 'NavratriCelebration',
  data() {
    return {
      isModalOpen: false,
      soundEnabled: true,
      audioCtx: null
    }
  },
  computed: {
    isAdminRoute() {
      return this.$route.path.startsWith('/admin')
    }
  },
  mounted() {
    // Listen for custom event so any button in the app can open the celebration
    this.openEventListener = () => this.openModal(true)
    window.addEventListener('open-navratri-celebration', this.openEventListener)

    // Check if user already saw the greeting in this browser session
    const viewedInSession = sessionStorage.getItem('manch_navratri_greeting_shown')

    if (!viewedInSession && !this.isAdminRoute) {
      // Auto open modal after 1.2s for pleasant non-jarring introduction
      setTimeout(() => {
        if (!this.isAdminRoute) {
          this.openModal(false)
          sessionStorage.setItem('manch_navratri_greeting_shown', 'true')
        }
      }, 1200)
    }
  },
  beforeUnmount() {
    if (this.openEventListener) {
      window.removeEventListener('open-navratri-celebration', this.openEventListener)
    }
  },
  methods: {
    openModal(fireEffects = false) {
      this.isModalOpen = true
      if (fireEffects) {
        this.triggerCelebration()
      }
    },
    closeModal() {
      this.isModalOpen = false
    },
    toggleAudio() {
      this.soundEnabled = !this.soundEnabled
      if (this.soundEnabled) {
        this.playTempleChime()
      }
    },
    getParticleStyle(i) {
      const colors = ['#F59E0B', '#EF4444', '#FBBF24', '#FB7185', '#E11D48']
      const size = 3 + (i % 5) * 2
      const top = (i * 19) % 95
      const left = (i * 29) % 95
      const duration = 3 + (i % 4) * 2
      const delay = (i % 3) * 0.7

      return {
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        backgroundColor: colors[i % colors.length],
        boxShadow: `0 0 12px ${colors[i % colors.length]}`,
        animation: `festiveDrift ${duration}s ease-in-out ${delay}s infinite alternate`
      }
    },
    triggerCelebration() {
      this.playTempleChime()

      // Festive Navratri Palette: Marigold Orange, Auspicious Kumkum Red, Saffron, Golden Radiance, Temple Emerald
      const festiveColors = ['#F59E0B', '#DC2626', '#FBBF24', '#EA580C', '#10B981', '#FFD700', '#F43F5E']

      // Left Burst (Flower Petals & Sparkles)
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.65 },
        colors: festiveColors,
        scalar: 1.15,
        ticks: 240
      })

      // Right Burst (Flower Petals & Sparkles)
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.65 },
        colors: festiveColors,
        scalar: 1.15,
        ticks: 240
      })

      // Center Shower
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 110,
          origin: { x: 0.5, y: 0.4 },
          colors: festiveColors,
          gravity: 0.85,
          scalar: 1.3,
          shapes: ['circle', 'square'],
          ticks: 280
        })
      }, 250)
    },
    playTempleChime() {
      if (!this.soundEnabled) return

      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!AudioContext) return

        if (!this.audioCtx) {
          this.audioCtx = new AudioContext()
        }

        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume()
        }

        const now = this.audioCtx.currentTime

        // Harmonious spiritual chime frequencies (E5, G#5, B5, E6)
        const notes = [659.25, 830.61, 987.77, 1318.51]

        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator()
          const gain = this.audioCtx.createGain()

          osc.type = 'sine'
          osc.frequency.setValueAtTime(freq, now + idx * 0.08)

          // Soft bell chime attack and gentle decay
          gain.gain.setValueAtTime(0.001, now + idx * 0.08)
          gain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.08 + 0.02)
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2)

          osc.connect(gain)
          gain.connect(this.audioCtx.destination)

          osc.start(now + idx * 0.08)
          osc.stop(now + idx * 0.08 + 1.25)
        })
      } catch (err) {
        // Silent fail if audio autoplay restricted
      }
    }
  }
}
</script>

<style scoped>
/* Keyframe animations for Diya flame flickering */
@keyframes flicker {
  0%, 100% {
    transform: scale(1) translateY(0);
    opacity: 0.95;
  }
  25% {
    transform: scale(1.06, 0.95) translateY(-1px);
    opacity: 1;
  }
  50% {
    transform: scale(0.96, 1.05) translateY(0.5px);
    opacity: 0.9;
  }
  75% {
    transform: scale(1.03, 0.98) translateY(-0.5px);
    opacity: 1;
  }
}

.flame-flicker {
  transform-origin: 20px 18px;
  animation: flicker 1.8s ease-in-out infinite;
}

.flame-flicker-strong {
  transform-origin: 50px 72px;
  animation: flicker 1.4s ease-in-out infinite;
}

@keyframes spinSlow {
  from {
    transform: translate(-50%, 0) rotate(0deg);
  }
  to {
    transform: translate(-50%, 0) rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spinSlow 40s linear infinite;
}

@keyframes festiveDrift {
  0% {
    transform: translateY(0px) scale(0.9);
    opacity: 0.3;
  }
  100% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.8;
  }
}

.festive-particle {
  border-radius: 9999px;
}

/* Modal and Banner Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.pop-in-enter-active,
.pop-in-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pop-in-enter-from,
.pop-in-leave-to {
  opacity: 0;
  transform: scale(0.7) translateY(20px);
}
</style>

