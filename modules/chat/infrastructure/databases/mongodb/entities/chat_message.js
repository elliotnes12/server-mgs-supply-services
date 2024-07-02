import mongoose from "mongoose";

const ChatMessageSchema = mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    message: String,
    type: {
      type: String,
      enum: ["TEXT", "IMAGE"]
    }
  },
  {
    timestamps: true
  }
);

ChatMessageSchema.virtual("createdAtFormatted").get(function() {
  const date = this.createdAt;
  return `${date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}`;
});

ChatMessageSchema.set("toJSON", {
  virtuals: true, 
  transform: function(doc, ret) {
    ret.createdAtFormatted = ret.createdAtFormatted; 
    delete ret._id; 
    return ret;
  }
});


export const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);
