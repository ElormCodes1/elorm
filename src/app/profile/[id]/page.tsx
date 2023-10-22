export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-700 min-h-full">
      <div className="">
        <div className="flex flex-wrap -mx-3 mb-6 mt-6 justify-center items-center">
          <h1>Profile</h1>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 items-center justify-center">
          <h1>profile of {params.id}</h1>
        </div>
      </div>
    </div>
  );
}
