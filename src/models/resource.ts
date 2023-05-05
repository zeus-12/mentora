import { Schema, model, models } from "mongoose";

const resourceSchema = new Schema({
  course_id: { type: String, required: true },
  resources: [
    {
      file_name: { type: String, required: true },
      file_url: { type: String, required: true },
      file_type: { type: String, required: true },
      date: { type: Date, default: Date.now },
      uploader: { type: String, required: true },
    },
  ],
});

const Resource = models.Resource || model("Resource", resourceSchema);

export default Resource;
