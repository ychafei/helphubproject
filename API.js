document.addEventListener('DOMContentLoaded', function () {
  fetch('https://volunteer.smartgate.pk/api/featured-campaigns')
    .then(response => response.json())
    .then(data => {
      const campaigns = data.data || []; // Replace with the correct API key structure if different
      const campaignList = document.getElementById('campaign-list');
      const recentCampaignList = document.getElementById('recent-campaign-list');

      campaigns.forEach(campaign => {
        var volunteers = campaign.volunteers.length; 

        // Prevent division by zero
        var progress = volunteers > 0 ? ((volunteers / campaign.goal) * 100).toFixed(2): 0;
        const campaignHTML = `
          <div class="col-md-4">
            <div class="card campaigns mb-4 shadow-sm">
              <a href="${campaign.link}" class="p-relative">
                <div class="ribbon-1" title="Featured Campaign">
                  <i class="fa fa-award"></i>
                </div>
                <img class="card-img-top" src="	https://volunteer.smartgate.pk/public/campaigns/small/${campaign.small_image}" alt="image">
              </a>
              <div class="card-body">
                <small class="btn-block mb-1">
                  <a href="" class="text-muted">
                    <i class="far fa-folder-open"></i> ${campaign.category.name}
                  </a>
                </small>
                <h5 class="card-title text-truncate">
                  <a href="" class="text-dark">${campaign.title}</a>
                </h5>

                <div class="progress progress-xs mb-1">
                  <div class="progress-bar bg-success" role="progressbar" style="width: ${progress}%">
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted"><strong>${volunteers}</strong> volunteers of ${campaign.goal} required</small>
                  <small class="font-weight-bold">${progress}%</small>
                </div>
                <hr>
                <p class="card-text text-truncate">We are looking for the volunteers to join our campaign for a good cause..</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-truncate">
                    <img src="https://volunteer.smartgate.pk/public/avatar/default.jpg" width="25" height="25" class="rounded-circle avatar-campaign">
                    <a href=""><small>by <strong>${campaign.user.name}</strong></small></a>
                  </span>
                  <small class="text-truncate"><i class="far fa-clock text-success"></i> Exprired on ${campaign.deadline}</small>
                </div>
                <hr>
                <div>
                  <a class="nav-link btn btn-primary pr-3 pl-3 py-2 btn-create no-hover rounded-pill" href="become-a-volunteer.html">
                    Become A Volunteer
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        campaignList.innerHTML += campaignHTML;
        recentCampaignList.innerHTML += campaignHTML;
      });
    })
    .catch(error => {
      console.error('Error fetching campaigns:', error);
    });
});