import mongoose from "mongoose";

const revisionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    revisionDates: [
      {
        date: {
          type: Date,
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      }
    ],
  },
  { timestamps: true }
);



const Revision = mongoose.models.Revision || mongoose.model("Revision", revisionSchema);
export default Revision;