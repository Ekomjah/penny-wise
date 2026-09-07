const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const LESSON_STATES = ['draft', 'published', 'archived'];

const InteractiveSectionWithinLessonSchema = new mongoose.Schema({
  question: { type: String, required: true },
  image: { type: String, required: true },
  answer: { type: String, required: true },
});

const LessonSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  state: { type: String, enum: LESSON_STATES, default: 'draft' },
  interactive_section: {
    type: [InteractiveSectionWithinLessonSchema],
  },
});

const LabSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  intro: { type: String, required: true },
  state: { type: String, enum: LESSON_STATES, default: 'draft' },
});

const ModuleSchema = new Schema({
  lessons: [LessonSchema],
  labs: [LabSchema],
});

module.exports = model('Module', ModuleSchema);
