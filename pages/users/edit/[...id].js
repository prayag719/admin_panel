import User from "@/pages/components/User";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/users?id=${id}`).then(response => {
      setUserInfo(response.data);
    });
  }, [id]);

  return (
    <div className="max-sm:p-4">
      <div className="sm:flex sm:items-center sm:justify-center">
        <div className="text-center sm:text-left">
          <p className="my-4 text-xl text-red-500">
            Editing <span className="text-green-600">{userInfo?.name}</span>
          </p>
        </div>
      </div>
      <hr className="my-8 h-px border-0 bg-gray-300" />
      <div className="my-10 max-sm:my-12">
        {userInfo && (
          <User {...userInfo} />
        )}
      </div>
    </div>
  );
}
