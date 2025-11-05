import SDresourceList from './SDresource.js';

function renderResourceList() {
  const resourceListContainer = document.getElementById("SDresourceList");
  
  if (!resourceListContainer) {
    console.error("Resource list container not found");
    return;
  }

  // Group resources by region
  const resourcesByRegion = {};
  SDresourceList.forEach(resource => {
    const region = resource.region || 'Other';
    if (!resourcesByRegion[region]) {
      resourcesByRegion[region] = [];
    }
    resourcesByRegion[region].push(resource);
  });

  // Create expandable sections for each region
  Object.keys(resourcesByRegion).forEach(region => {
    const regionSection = document.createElement("div");
    regionSection.classList.add("region-section", "collapsed");
    
    // Create region header (clickable to expand/collapse)
    const regionHeader = document.createElement("div");
    regionHeader.classList.add("region-header");
    regionHeader.innerHTML = `
      <h3>${region} <span class="toggle-icon">▶</span></h3>
      <p>${resourcesByRegion[region].length} resources available</p>
    `;
    regionHeader.addEventListener('click', () => toggleRegion(regionHeader));
    
    // Create table for this region's resources
    const table = document.createElement("table");
    table.classList.add("resource-table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Program Name</th>
          <th>City</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Schedule</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    
    const tbody = table.querySelector('tbody');
    resourcesByRegion[region].forEach(resource => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td data-label="Program Name"><strong>${resource.programName}</strong></td>
        <td data-label="City">${resource.city}</td>
        <td data-label="Address">${resource.address}</td>
        <td data-label="Phone">${resource.phone}</td>
        <td data-label="Schedule">${resource.distributionSchedule}</td>
        <td data-label="Notes">${resource.notes || 'N/A'}</td>
      `;
      tbody.appendChild(row);
    });
    
    // Create collapsible content container
    const regionContent = document.createElement("div");
    regionContent.classList.add("region-content");
    regionContent.style.display = 'none'; // Start collapsed
    regionContent.appendChild(table);
    
    regionSection.appendChild(regionHeader);
    regionSection.appendChild(regionContent);
    resourceListContainer.appendChild(regionSection);
  });
}

function toggleRegion(header) {
  const content = header.nextElementSibling;
  const icon = header.querySelector('.toggle-icon');
  
  if (content.style.display === 'none') {
    content.style.display = 'block';
    icon.textContent = '▼';
    header.parentElement.classList.remove('collapsed');
  } else {
    content.style.display = 'none';
    icon.textContent = '▶';
    header.parentElement.classList.add('collapsed');
  }
}

// Wait for DOM to load before rendering
document.addEventListener('DOMContentLoaded', renderResourceList);