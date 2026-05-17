<template>
  <div class="py-20 bg-gray-50/50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Our <span class="text-primary">Academic Programs</span>
        </h1>
        <p class="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
          Comprehensive, structured and results-oriented coaching programs designed by expert faculty to help you excel in school, board exams, and national-level entrances.
        </p>
        <div class="w-24 h-1 bg-secondary mx-auto mt-6 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <CourseCard
          v-for="(course, index) in courses"
          :key="index"
          :title="course.title"
          :tag="course.tag"
          :category="course.category"
          :description="course.description"
          :points="course.points"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CourseCard from "../components/common/CourseCard.vue";

export default {
  name: "CoursesPage",
  components: {
    CourseCard,
  },
  data() {
    return {
      courses: [
        {
          title: "8th - 9th Foundation",
          tag: "Foundation Batch",
          category: "School Curriculum",
          description: "Nurturing young minds to build a rock-solid conceptual base for NTSE, Olympiads, and future competitive engineering/medical exams.",
          points: [
            "Strong focus on conceptual clarity in Mathematics & Science",
            "Specialized mental ability & logical reasoning training modules",
            "Early diagnostic tests to identify and bridge learning gaps",
            "Regular subjective assessments and personalized performance feedback"
          ],
        },
        {
          title: "10th Boards (SSC & CBSE)",
          tag: "Board Masterclass",
          category: "Secondary Education",
          description: "Targeted, high-yield coaching to help students achieve top scores in board examinations with comprehensive syllabus coverage and strategies.",
          points: [
            "100% board syllabus completion well ahead of school timelines",
            "Rigorous daily practice papers (DPPs) & chapter worksheets",
            "15+ full-length mock board exams with expert paper grading",
            "Special sessions on board answer presentation & speed building"
          ],
        },
        {
          title: "HSC (11th & 12th Board)",
          tag: "HSC Masterclass",
          category: "Senior Secondary",
          description: "Comprehensive program focusing on the Science stream to master standard textbook concepts and deliver excellent board scores.",
          points: [
            "Detailed lectures covering Physics, Chemistry, Biology & Maths",
            "Perfect alignment with Maharashtra State Board & CBSE guidelines",
            "Exhaustive test series to master writing descriptive subjective answers",
            "Practical laboratory guidance and theoretical project assistance"
          ],
        },
        {
          title: "MHT-CET Entrance",
          tag: "Entrance Special",
          category: "State Level Competitive",
          description: "Expert engineering and pharmacy entrance coaching designed for maximum speed, accuracy, and high percentile achievement.",
          points: [
            "Fast-paced concept delivery paired with smart shortcut methods",
            "Focused drills on high-weightage topics and past CET trends",
            "20+ full-length simulated Computer Based Tests (CBT)",
            "Detailed metrics highlighting time spent per question and weak areas"
          ],
        },
        {
          title: "NEET (Medical Prep)",
          tag: "NEET Achievers",
          category: "National Level Competitive",
          description: "Rigorous and highly targeted preparation for medical aspirants to crack the NEET exam and secure seats in top government colleges.",
          points: [
            "Deep, NCERT-centric core concepts for Biology, Physics & Chemistry",
            "Specially curated high-yield revision booklets & flashcards",
            "Weekly chapter-wise diagnostics & 25+ major full-length mock exams",
            "One-on-one academic mentorship and rigorous doubt resolution"
          ],
        },
        {
          title: "JEE Main & Advanced",
          tag: "JEE Champions",
          category: "National Level Competitive",
          description: "Our premium training program for engineering aspirants, emphasizing complex multi-concept problem-solving and critical thinking.",
          points: [
            "Rigorous conceptual building led by veteran JEE experts",
            "Graded problem sheets matching actual JEE Advanced complexity",
            "National-level simulated CBT series with real-time percentile ranking",
            "Mistake analysis sessions to minimize exam-day negative marking"
          ],
        },
      ],
    };
  },
};
</script>
