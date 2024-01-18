import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/message`;
const initialState = {
  status: "",
  error: "",
  conversations: [],
  activeConversation: {},
  messages: [],
  notifications: [],
  files: [],
};

//fuinctions
export const getConversations = createAsyncThunk(
  "conversation/all",
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(CONVERSATION_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Getting convo -------> ", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const openCreateCoversation = createAsyncThunk(
  "conversation/open_create",
  async (values, { rejectWithValue }) => {
    try {
      const { token, isGroup, receiver_id } = values;
      const { data } = await axios.post(
        CONVERSATION_ENDPOINT,
        { receiver_id, isGroup },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getConversationMessages = createAsyncThunk(
  "conversation/messages",
  async (values, { rejectWithValue }) => {
    const { token, convo_id } = values;
    try {
      const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${convo_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/send",
  async (values, { rejectWithValue }) => {
    try {
      const { token, message, convo_id, files } = values;
      const { data } = await axios.post(
        MESSAGE_ENDPOINT,
        {
          message,
          convo_id,
          files,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const createGroupConversation = createAsyncThunk(
  "conversation/create_group",
  async (values, { rejectWithValue }) => {
    const { token, name, users } = values;
    try {
      const { data } = await axios.post(
        `${CONVERSATION_ENDPOINT}/group`,
        { name, users },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const removeMessage = createAsyncThunk(
  "message/delete",
  async (values, { rejectWithValue }) => {
    const { token, message_id } = values;
    try {
      const { data } = await axios.patch(
        `${MESSAGE_ENDPOINT}/delete/${message_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const editMessage = createAsyncThunk(
  "message/edit",
  async (values, { rejectWithValue }) => {
    try {
      const { token, message, message_id } = values;
      const { data } = await axios.put(
        `${MESSAGE_ENDPOINT}/${message_id}`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const replyMessage = createAsyncThunk(
  "message/reply",
  async (values, { rejectWithValue }) => {
    try {
      const { token, message, convo_id, files, reply_id } = values;
      const { data } = await axios.patch(
        `${MESSAGE_ENDPOINT}/reply/${reply_id}`,
        {
          message,
          convo_id,
          files,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const submitReactionEmoji = createAsyncThunk(
  "message/emoji",
  async (values, { rejectWithValue }) => {
    try {
      const { token, emoji, message_id } = values;
      const { data } = await axios.put(
        `${MESSAGE_ENDPOINT}/reaction/${message_id}`,
        {
          emoji,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    //update messages
    updateMessagesAndConversations: (state, action) => {
      let convo = state.activeConversation;
      if (convo._id === action.payload.conversation._id) {
        state.messages = [...state.messages, action.payload];
      }
      //update conversations
      let conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      let newConvos = [...state.conversations].filter(
        (c) => c._id !== conversation._id
      );
      newConvos.unshift(conversation);
      state.conversations = newConvos;
    },
    addRepliedMessage: (state, action) => {
      let convo = state.activeConversation;
      if (convo._id === action.payload.conversation._id) {
        state.messages = [...state.messages, action.payload];
      }
      //update conversations
      let conversation = {
        ...action.payload.conversation,
        latestMessage: action.payload,
      };
      let newConvos = [...state.conversations].filter(
        (c) => c._id !== conversation._id
      );
      newConvos.unshift(conversation);
      state.conversations = newConvos;
    },
    updateDeletedMessage: (state, action) => {
      state.messages.forEach((msg) => {
        if (msg._id === action.payload._id) {
          msg.status = "deleted";
        }
      });
      state.conversations.forEach((convo) => {
        if (convo?.latestMessage?._id === action.payload._id) {
          convo.latestMessage.status = "deleted";
        }
      });
    },
    updateEditedMessage: (state, action) => {
      state.messages.forEach((msg) => {
        if (msg._id === action.payload._id) {
          msg.message = action.payload.message;
          msg.editedStatus = true;
        }
      });
    },
    updateReactedMessage: (state, action) => {
      state.messages.forEach((msg) => {
        if (msg._id === action.payload._id) {
          msg.reaction = action.payload.reaction;
        }
      });
      console.log("Testpro ---", state.messages);
    },
    addFiles: (state, action) => {
      state.files = [...state.files, action.payload];
    },
    clearFiles: (state, action) => {
      state.files = [];
    },
    removeFileFromFiles: (state, action) => {
      let index = action.payload;
      let files = [...state.files];
      let fileToRemove = [files[index]];
      state.files = files.filter((file) => !fileToRemove.includes(file));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getConversations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload.data;
        console.log("Getting convo 2 ----", action.payload.data);
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      })
      .addCase(openCreateCoversation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(openCreateCoversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeConversation = action.payload.data;
        state.files = [];
      })
      .addCase(openCreateCoversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      })
      .addCase(getConversationMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload.data;
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload.data];
        let conversation = {
          ...action.payload.data.conversation,
          latestMessage: action.payload.data,
        };
        let newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation._id
        );
        newConvos.unshift(conversation);
        state.conversations = newConvos;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      })
      .addCase(createGroupConversation.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createGroupConversation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload.data];
        let conversation = {
          ...action.payload.data.conversation,
          latestMessage: action.payload.data,
        };
        let newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation._id
        );
        newConvos.unshift(conversation);
        state.conversations = newConvos;
      })
      .addCase(createGroupConversation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      })
      .addCase(removeMessage.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(removeMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages.forEach((msg) => {
          if (msg._id === action.payload.data._id) {
            msg.status = "deleted";
          }
        });
        state.conversations.forEach((convo) => {
          if (convo?.latestMessage?._id === action.payload.data._id) {
            convo.latestMessage.status = "deleted";
          }
        });
      })
      .addCase(removeMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      })
      .addCase(editMessage.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages.forEach((msg) => {
          if (msg._id === action.payload.data._id) {
            msg.message = action.payload.data.message;
            msg.editedStatus = true;
          }
        });
      })
      .addCase(editMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      })
      .addCase(submitReactionEmoji.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(submitReactionEmoji.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages.forEach((msg) => {
          if (msg._id === action.payload.data._id) {
            msg.reaction = action.payload.data.reaction;
          }
        });
      })
      .addCase(submitReactionEmoji.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(replyMessage.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(replyMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, action.payload.data];
        let conversation = {
          ...action.payload.data.conversation,
          latestMessage: action.payload.data,
        };
        let newConvos = [...state.conversations].filter(
          (c) => c._id !== conversation._id
        );
        newConvos.unshift(conversation);
        state.conversations = newConvos;
      })
      .addCase(replyMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      });
  },
});

export const {
  setActiveConversation,
  updateMessagesAndConversations,
  updateDeletedMessage,
  addFiles,
  clearFiles,
  removeFileFromFiles,
  updateEditedMessage,
  updateReactedMessage,
  addRepliedMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
