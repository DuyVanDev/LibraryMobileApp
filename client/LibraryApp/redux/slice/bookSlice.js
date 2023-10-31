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
      const response = await api.get('/api/book');
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
      const response = await api.get('/api/book');
      const bookData = await response.data.result;
      return bookData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

// export const fetchBooksByCategory = createAsyncThunk(
//   'book/fetchBooksByCategory',
//   async (cId, thunkAPI) => {
//     try {
//       const response = await api.get(`api/Book/category?cat=${cId}`);
//       const bookData = await response.data.result;
//       return bookData;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   },
// );
export const fetchBooksByCategoryId = createAsyncThunk('book/fetchBooksByCategoryId', async (categoryId,thunkAPI) => {
  try {
    const response = await api.get(`/api/book/category?cat=${categoryId.categoryId}`);
    const bookData = await response.data.result;
    console.log(bookData)
    return bookData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const selectBooksByCategoryId = (categoryId) => createSelector(
//   (state) => state.booksByCategory[categoryId],
//   (books) => books || []
// );

const initialState = {
  books: [],
  booksByCategory: {},
  isLoadingBooksByCategory : "idle",
  isLoadingBooks: 'idle',
  isLoadingBooksNew: 'idle',
  isLoadingBooksPopular: 'idle',
  bookDetail: [],
  booksRecently: [],
  usedBookIds: [],
  booksPopular: [],
  booksNew: [],
};
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBookRecently: (state, action) => {
      const {bookId} = action.payload;

      const bookExists = state.booksRecently.find(
        book => book.bookId === bookId,
      );
      if (!bookExists) {
        state.booksRecently = [
          ...state.booksRecently,
          {...action.payload, currentPage: 1},
        ];

        // Nếu cuốn sách đã tồn tại, cập nhật trang hiện tại
      }
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
        const categoryId = action.meta.arg
        state.booksByCategory[categoryId.categoryId] = action.payload;
      });
  },
});
export const {addBookRecently, startReading, stopReading} =
  bookSlice.actions;

export default bookSlice.reducer;
