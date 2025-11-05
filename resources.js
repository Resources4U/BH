import SDresourceList from './SDresource.js';

function renderResourceList() {
  const resourceListContainer = document.getElementById("SDresourceList");
  
  if (!resourceListContainer) {
    console.error("Resource list container not found");
    return;
  }

  SDresourceList.forEach(resource => {
    const resourceItem = document.createElement("div");
    resourceItem.classList.add("resource-item");
    resourceItem.innerHTML = `
      <h4>${resource.programName}</h4>
      <p><strong>Location:</strong> ${resource.city}, ${resource.state}</p>
      <p><strong>Address:</strong> ${resource.address}</p>
      <p><strong>Phone:</strong> ${resource.phone}</p>
      <p><strong>Distribution Schedule:</strong> ${resource.distributionSchedule}</p>
      <p><strong>Notes:</strong> ${resource.notes}</p>
    `;
    resourceListContainer.appendChild(resourceItem);
  });
}

// Wait for DOM to load before rendering
document.addEventListener('DOMContentLoaded', renderResourceList);