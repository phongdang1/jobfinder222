# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


my-react-project/
│
├── public/
│
├── src/
│ ├── assets/ # Các tài nguyên tĩnh như hình ảnh, phông chữ, v.v.
│ │ ├── images/ # Hình ảnh sử dụng trong ứng dụng
│ │ └── css/ # CSS custom, vì tailwind có mấy cái nó không hỗ trợ thì ae vào sử dụng css cx được nhưng đặt tên file để dễ phân biệt tý
│ │
│ ├── components/ # Các component tái sử dụng
│ │ ├── Admin #component cho admin
│ │ ├── User #component cho candidate
│ │ ├── Company #component cho company
│ │ └── Common #component chung
│ │
│ ├── hooks/ # Các hook tùy chỉnh
│ │
│ ├── pages/ # Các component đại diện cho các trang của ứng dụng
│ │ ├── Admin #component cho admin
│ │ ├── User #component cho candidate
│ │ ├── Company #component cho company
│ │ └── Common #component chung
│ │
│ ├── redux/ # Quản lý trạng thái với Redux (nếu có sử dụng Redux)
│ │ ├── actions/ # Các hành động của Redux
│ │ ├── reducers/ # Các bộ giảm Redux
│ │ ├── store.js # Cấu hình store của Redux
│ │ └── types.js # Các loại hành động
│ │
│ ├── services/ # Các dịch vụ API
│ │
│ ├── routes/ # Route để dẫn tới các trang khác, ae tạo route theo từng actor riêng biệt
│ │ ├── routes.js # Route chính
│ │
│ ├── utils/ # Các hàm tiện ích và hỗ trợ
│ │ ├── formatDate.js # Hàm định dạng ngày tháng
│ │ ├── validate.js # Hàm xác thực dữ liệu
│ │ └── ... # Các tiện ích khác
│ │
│ ├── App.js # Component chính của ứng dụng
│ ├── index.js # Điểm vào của ứng dụng React
│ ├── routes.js # Cấu hình các tuyến đường của ứng dụng
│ └── serviceWorker.js # Service worker hỗ trợ chế độ offline (tùy chọn)
│
├── .gitignore # Các tập tin và thư mục cần loại trừ khỏi git
├── package.json # Tệp cấu hình của npm