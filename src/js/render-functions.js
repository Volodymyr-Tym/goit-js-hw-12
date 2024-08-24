export const createGalleryImageTemplate = imageInfo => {
  return `
        <li class="gallery-item">
          <a class="item-link" href="${imageInfo.largeImageURL}">
            <img class="item-img"
            src="${imageInfo.webformatURL}"
            alt="${imageInfo.tags}"/>
          </a>
    
          <ul class="item-info-list">
            <li class="item-info">
              Likes <span class="quantity">${imageInfo.likes}</span> 
            </li>
    
            <li class="item-info">
              Views <span class="quantity">${imageInfo.views}</span>
            </li>
    
            <li class="item-info">
              Comments <span class="quantity">${imageInfo.comments}</span>
            </li>
    
            <li class="item-info">
              Downloads <span class="quantity">${imageInfo.downloads}</span>
            </li>
          </ul>
        </li>
      `;
};
