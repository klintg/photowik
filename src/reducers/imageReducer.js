export default function uploadReducer(state={}, action) {
  switch(action.type) {
    case "UPLOAD_IMAGE":
    return [...state,
      Object.assign({}, action.pic)
    ];

    default:
      return state;
  }
}
