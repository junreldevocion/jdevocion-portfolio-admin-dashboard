export default function RegisterPage() {
  return (
    <div className="w-[500px] bg-white rounded m-auto p-8">
      <h1 className="font-bold">Register</h1>
      <form className="flex flex-col gap-4 mt-12">
        <div className="flex flex-col gap-2">
          <label id="fullname" className="text-sm">Fullname</label>
          <input name="fullname" className="p-2 border rounded border-indigo-50 text-sm" type="text" placeholder="Enter username" />
          <span className="text-red-400 text-sm font-extralight">Fullname is requied</span>
        </div>
        <div className="flex flex-col gap-2">
          <label id="username" className="text-sm">Username</label>
          <input name="username" className="p-2 border rounded border-indigo-50 text-sm" type="password" placeholder="Enter password" />
          <span className="text-red-400 text-sm font-extralight">Username is requied</span>
        </div>
        <div className="flex flex-col gap-2">
          <label id="password" className="text-sm">Password</label>
          <input name="passowrd" className="p-2 border rounded border-indigo-50 text-sm" type="password" placeholder="Enter password" />
          <span className="text-red-400 text-sm font-extralight">Password is requied</span>
        </div>
        <div className="flex flex-col gap-2">
          <label id="confirm-passowrd" className="text-sm">Confirm password</label>
          <input name="confirm-password" className="p-2 border rounded border-indigo-50 text-sm" type="password" placeholder="Enter password" />
          <span className="text-red-400 text-sm font-extralight">Confirm password is requied</span>
        </div>
        <div className="flex flex-col gap-2">
          <button type="submit" className="px-4 py-2 bg-indigo-400 rounded cursor-pointer text-white text-sm">Register</button>
        </div>
      </form>
    </div>
  );
}