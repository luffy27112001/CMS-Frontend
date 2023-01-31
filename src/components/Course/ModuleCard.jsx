import React, { Fragment } from "react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

const ModuleCard = ({module}) => {
  return (
    <Fragment>
      <div className="w-full flex justify-center items-center mt-7 relative">
        <ViewModuleIcon
          fontSize="large"
          color="primary"
          className="absolute left-72 "
        />

        <div className="w-2/3 py-4 text-xl px-16 rounded-lg bg-white font-semibold hover:cursor-pointer ml-9">
          <span className="pl-1">{module.name}</span>
          {/* <span className="pl-1">{module}</span> */}
        </div>
      </div>
    </Fragment>
  );
};

export default ModuleCard;
