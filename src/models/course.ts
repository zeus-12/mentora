import { Schema, model, models } from "mongoose";

const courseSchema = new Schema({
  course_id: { type: String, required: true },
  credits: { type: Number },
  description: { type: String },
  course_type: { type: String },
  course_name: { type: String, required: true },
  course_content: [{ type: String }],
  prerequisites: [{ type: String }],
  text_books: [{ type: String }],
  reference_books: [{ type: String }],
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
