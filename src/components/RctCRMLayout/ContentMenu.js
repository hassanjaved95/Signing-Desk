import React from "react";
import { CreateNewFolder, Edit } from '@material-ui/icons';


const ContentMenu = (props) => (
    <div className="folderbar">
        <Edit className="editicon" />
        <CreateNewFolder className="createnewfoldericon" onClick={props.onCreateNewFolder} />
        {/* <ul   >
          <li onClick={props.oncloseList} style={{width:'30px', height:'30px', backgroundColor:'#fff', color:'black'}}> 
          test </li> </ul> */}
    </div>
);

export default ContentMenu;