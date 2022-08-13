let days, years;

for (let date=1; date<=31; date++) {
  days += `<option value=${date}>${date}</option>`
}

for (let year = 2022; year >= 1975; year--) {
	years += `<option value=${year}>${year}</option>`;
}

const verify = `
<section id="wrapper">
		<header class="site-header">
			<div class="container-fluid">
				<nav class="navbar site-navigation">
					<div class="navbar-brand">
						<a href="#">
							<img src="asset/img/client-Valley-Logo.svg" alt="Logo">
						</a>
					</div>
				</nav>
			</div><!-- container -->
		</header>


		<main class="site-main">
			<section class="common-sec">
				<div class="container-fluid">
					
					<div class="date-of-birth-fields">
						<h4 class="heading">Please enter your Date of Birth to read the message</h4>
						<form name="form">
						<div class="dob-wrapp">
							<div class="dob-select dob-month">
								<select required name="" class="form-control" id="">
									<option value="">Month</option>
									<option value="1">Jan</option>
									<option value="2">Feb</option>
									<option value="3">Mar</option>
									<option value="4">Apr</option>
									<option value="5">May</option>
									<option value="6">Jun</option>
									<option value="7">Jul</option>
									<option value="8">Aug</option>
									<option value="9">Sep</option>
									<option value="10">Oct</option>
									<option value="11">Nov</option>
									<option value="12">Dec</option>
								</select>
							</div>

							<div class="dob-select dob-date">
								<select required name="" class="form-control" id="">
									<option value="">Date</option>
									${days}
								</select>
							</div>

							<div class="dob-select dob-year">
								<select required name="" class="form-control" id="">
									<option value="">Year</option>
									${years}
								</select>
							</div>
						</div>

						<div class="input-submit">
							<button id="button" type="submit" class="custom-btn">Submit</button>
						</div>

						<p id="error" style="display: none" class="msg-error">Please enter correct Date of Birth</p>
					</div><!-- date-of-birth-fields -->
					
				</div><!-- container -->
			</section><!-- common-sec -->
		</main>
	</section><!-- wrapper -->

	<!-- Modal Thank you Success message -->
	<div class="modal fade custom-modal verifiedModalClass" id="verifiedDobModal" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button style="display: none" type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body text-center">
					<div class="img mb-4">
						<img src="asset/img/verified.png" alt="Success">
					</div>
					<h3 class="modal-title text-center">Thank You!</h3>
					<p>Please Check Your Email.</p>

				</div><!-- modal-body -->
			</div>
		</div>
	</div>
	<!-- modal -->
	
	  <div style="display: none" id="loading">
      <div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    </div>
`;

export { verify };

