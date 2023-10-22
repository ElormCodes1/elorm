export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-700 min-h-full">
      <div className="">
        <div className="flex flex-wrap -mx-3 mb-6 mt-6 justify-center items-center">
          <h1>Profile</h1>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
          <button type="submit">Logout</button>
        </div>
      </div>
    </div>
  );
}
