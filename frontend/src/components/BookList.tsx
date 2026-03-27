import { useEffect, useState } from 'react';

// Define the shape of a single Book
export interface Book {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

// Define the shape of our paginated API response
export interface PaginatedResponse {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  books: Book[];
}

const BookList = () => {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortOrder, setSortOrder] = useState('title_asc');

  useEffect(() => {
    const fetchBooks = async () => {
      // REPLACE YOUR_BACKEND_PORT WITH YOUR ACTUAL API PORT
      const url = `http://localhost:5145/api/Books?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}`;
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    };

    fetchBooks();
  }, [page, pageSize, sortOrder]);

  if (!data) {
    return <div className="text-center mt-5">Loading books...</div>;
  }

  // Generate an array of page numbers (e.g., [1, 2, 3, 4, 5])
  const pageNumbers = Array.from({ length: data.totalPages }, (_, i) => i + 1);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-dark mb-4">Bookstore Catalog</h2>

      {/* Controls for Sorting and Page Size */}
      <div className="row mb-3">
        <div className="col-md-6 d-flex align-items-center">
          <label className="me-2 fw-bold">Sort By:</label>
          <select 
            className="form-select w-auto" 
            value={sortOrder} 
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1); // Reset to first page when sorting changes
            }}
          >
            <option value="title_asc">Title (A-Z)</option>
            <option value="title_desc">Title (Z-A)</option>
          </select>
        </div>
        
        <div className="col-md-6 d-flex align-items-center justify-content-md-end mt-2 mt-md-0">
          <label className="me-2 fw-bold">Results per page:</label>
          <select 
            className="form-select w-auto" 
            value={pageSize} 
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1); // Reset to first page when page size changes
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* Books Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Pages</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.books.map((b) => (
              <tr key={b.bookId}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.isbn}</td>
                <td>{b.category} ({b.classification})</td>
                <td>{b.pageCount}</td>
                <td>${b.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dynamic Pagination */}
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination flex-wrap">
          {pageNumbers.map((num) => (
            <li key={num} className={`page-item ${page === num ? 'active' : ''}`}>
              <button 
                className="page-link" 
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default BookList;