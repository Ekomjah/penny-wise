const mongoose = require("mongoose");
const LESSON_STATES = ["draft", "published", "archived"];

const InteractiveSectionWithinLessonSchema = new mongoose.Schema({
  question: { type: String, required: true },
  image: { type: String, required: true },
  answer: { type: String, required: true },
});

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  state: { type: String, enum: LESSON_STATES, default: "draft" },
  interactive_section: {
    type: [InteractiveSectionWithinLessonSchema],
    default: null,
  },
});

const SpendLabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const ModuleSchema = new mongoose.Schema({
  lessons: [LessonSchema],
  spendLabs: [SpendLabSchema],
});
