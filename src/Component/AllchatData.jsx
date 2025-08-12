

const AllchatData = ({chat}) => {
     const {text,sender} = chat;

     const creatShortTitle = ( text, wordlimit = 4) => {

          if(!text) return "";
          const words = text.trim().split(/\s+/);
          const shortTitle = words.slice(1 , wordlimit).join(" ");
          return words.length > wordlimit ? shortTitle + "" : shortTitle
     }
       if (sender === "user") {
    return null;
  }

     
     return (
          <div>
               <div className="cursor-pointer">
                    <h2>{creatShortTitle(text)}</h2>
               </div>
          </div>
     );
};

export default AllchatData;