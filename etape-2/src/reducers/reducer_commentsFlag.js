export default function(commentsFlag = false, action) {
   switch (action.type) {
      case "COMMENTS_FLAG":
         const newValue = action.payload;
         return newValue;
   }
   return commentsFlag;
}
