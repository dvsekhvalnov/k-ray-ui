const pagesPerSheet = 4;

const getPage = (param) => {
  let page = isNaN(param) ? 1 : parseInt(param)
  if (page < 1) {
    page = 1
  }

  return page
}

const getVisiblePages = (page, total, itemsPerPage) => {
  const lastPage = Math.ceil  (total / itemsPerPage);

	let leftPage = Math.max(1, page - pagesPerSheet);
	const rightPage = Math.min(lastPage, leftPage + pagesPerSheet * 2);

	//shortcircuit if we at the rightmost end
	if(rightPage == lastPage) {
		leftPage = Math.max(1, rightPage - pagesPerSheet * 2);
	}

  // if lastPage = 0

  return _.range(leftPage, rightPage+1)
}

export { getVisiblePages, getPage }
