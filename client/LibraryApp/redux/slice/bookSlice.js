import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import api from '../../api/client';
export const fetchBook = createAsyncThunk('book/fetchBooks', async thunkAPI => {
  try {
    const response = await api.get('/api/book');
    const bookData = await response.data.result;
    return bookData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const fetchBookDetail = createAsyncThunk(
  'book/fetchBook',
  async (bookId, thunkAPI) => {
    try {
      const response = await api.get('/api/book');
      const bookData = await response.data.result;
      return bookData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchBooksPopular = createAsyncThunk(
  'book/fetchBooksPopular',
  async (bookId, thunkAPI) => {
    try {
      const response = await api.get('/api/book/popular');
      const bookData = await response.data.result;
      return bookData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchBooksNew = createAsyncThunk(
  'book/fetchBooksNew',
  async (bookId, thunkAPI) => {
    try {
      const response = await api.get('/api/book/new');
      const bookData = await response.data.result;
      return bookData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchBookReceived = createAsyncThunk(
  'book/fetchBookReceived',
  async (userId, thunkAPI) => {
    try {
      const response = await api.get('/api/book/new');
      const bookData = await response.data.result;
      return bookData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);


export const fetchBooksByCategoryId = createAsyncThunk(
  'book/fetchBooksByCategoryId',
  async (categoryId, thunkAPI) => {
    try {
      const response = await api.get(
        `/api/book/category?cat=${categoryId.categoryId}`,
      );
      const bookData = await response.data.result;
      return bookData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchBooksRequestingByUserId = createAsyncThunk(
  'book/fetchBooksRequestByUserId',
  async (userId,thunkAPI) => {
    try {
      const response = await api.get(`/api/book/request?userId=${userId}`);
      const data = await response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchBooksReceivedByUserId = createAsyncThunk(
  'book/fetchBooksReceivedByUserId',
  async (userId,thunkAPI) => {
    try {
      const response = await api.get(`/api/book/received?userId=${userId}`);
      const data = await response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  books: [],
  booksByCategory: {},
  isLoadingBooksByCategory: 'idle',
  isLoadingBooks: 'idle',
  isLoadingBooksNew: 'idle',
  isLoadingBooksPopular: 'idle',
  booksRecently: [],
  usedBookIds: [],
  booksPopular: [],
  booksNew: [],
  booksRequesting: [],
  booksReceived: []
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBookRecently: (state, action) => {
      const {bookId} = action.payload;

      const bookExists = state.booksRecently.findIndex(
        book => book.bookId === bookId,
      );
      if (bookExists == -1) {
        state.booksRecently = [
          {...action.payload, currentPage: 1},
          ...state.booksRecently,
        ];
      } else {
        let objectToMove = state.booksRecently.splice(bookExists, 1)[0];

        state.booksRecently.unshift(objectToMove);
      }
      // Nếu cuốn sách đã tồn tại
    },
    clearBookRe: (state, action) => {
      (state.booksRecently = []), (state.books = []), (state.bookDetail = []);
      (state.booksPopular = []), (state.booksNew = []);
    },
    startReading: (state, action) => {
      const {bookId} = action.payload;
      // Bắt đầu đọc sách bằng cách lưu trang đang đọc

      var bookindex = state.booksRecently.findIndex(
        book => book.product.bookId == bookId,
      );
      var book = state.booksRecently.find(book => book.bookId == bookId);
    },
    stopReading: (state, action) => {
      const {bookId, currentPage} = action.payload;
      var bookindex = state.booksRecently.findIndex(
        book => book.bookId == bookId,
      );
      // Ngừng đọc sách bằng cách đặt trang đang đọc thành null
      state.booksRecently[bookindex].currentPage = currentPage;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchBook.pending, state => {
        state.isLoadingBooks = 'pending';
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.books = action.payload;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        // state.loading = 'rejected';
        // state.error = action.payload;
      })
      .addCase(fetchBooksPopular.pending, state => {
        state.isLoadingBooksPopular = 'pending';
      })
      .addCase(fetchBooksPopular.fulfilled, (state, action) => {
        state.booksPopular = action.payload;
      })
      .addCase(fetchBooksNew.pending, state => {
        state.isLoadingBooksNew = 'pending';
      })
      .addCase(fetchBooksNew.fulfilled, (state, action) => {
        state.booksNew = action.payload;
      })
      .addCase(fetchBooksByCategoryId.pending, state => {
        state.isLoadingBooksByCategory = 'pending';
      })
      .addCase(fetchBooksByCategoryId.fulfilled, (state, action) => {
        const categoryId = action.meta.arg;
        state.booksByCategory[categoryId.categoryId] = action.payload;
      })
      .addCase(fetchBooksRequestingByUserId.fulfilled, (state, action) => {
        state.booksRequesting = action.payload;
      })
      .addCase(fetchBooksReceivedByUserId.fulfilled, (state, action) => {
        state.booksReceived = action.payload;
      });
  },
});
export const {addBookRecently, startReading, stopReading, clearBookRe} =
  bookSlice.actions;

export default bookSlice.reducer;
