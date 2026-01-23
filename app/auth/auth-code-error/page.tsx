// create a page to show error message when auth code is invalid

import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div>
      <h1>Mã xác thực không hợp lệ</h1>
      <p>Vui lòng thử lại sau</p>
      
      <Link href="/auth/login">Đăng nhập</Link>
    </div>
  );
}