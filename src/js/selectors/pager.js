const pagesPerSheet = 4;

const getPage = (param, total, itemsPerPage) => {
  const lastPage = Math.floor(total / itemsPerPage);
  let page = isNaN(param) ? 1 : parseInt(param)
  if (page < 1) {
    page = 1
  }

  if(page > lastPage) {
		page = lastPage;
	}

  return page
}

const getVisiblePages = (page, total, itemsPerPage) => {
  const lastPage = Math.floor(total / itemsPerPage);

  console.log("page=", page);
  console.log("total=", total);
  console.log("itemsPerPage=", itemsPerPage);

	let leftPage = Math.max(1, page - pagesPerSheet);
	const rightPage = Math.min(lastPage, leftPage + pagesPerSheet * 2);

	//shortcircuit if we at the rightmost end
	if(rightPage == lastPage) {
		leftPage = Math.max(1, rightPage - pagesPerSheet * 2);
	}

  return _.range(leftPage, rightPage+1)
}

export { getVisiblePages, getPage }
