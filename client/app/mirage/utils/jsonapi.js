
export default function() {
  return {
    objectToJsonApi(obj, type) {
      return {
        data: {
          type: type,
          id: obj.id,
          attributes: obj
        }
      };
    },

    arrayToJsonApi(array, type) {
      return {
        data: array.map(obj => ({
          type: type,
          id: obj.id,
          attributes: obj
        }))
      };
    }

  }
}
