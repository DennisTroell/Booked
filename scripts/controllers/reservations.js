        controllers.controller('ReservationListController', ['$scope', '$routeParams', 'Reservation', 'Resource', '$timeout', '$interval', '$location',
  function ReservationListController($scope, $routeParams, Reservation, Resource, $timeout, $interval, $localStorage) {
                $scope.reservations = [];
                $scope.resources = [];
                $scope.clock = Date.now();
                $scope.id = $routeParams.id;

                var tick = function () {
                    $scope.clock = Date.now(); // get the current time
                    $timeout(tick, $scope.tickInterval); // reset the timer
                }

                var tidkvar = function () {
                    $scope.clock = new Date(); // get the current time

                    //Reservations
                    for (index = 0; index < $scope.reservations.length; ++index) {
                        var reservation = $scope.reservations[index];
                        reservation.timeleft = moment.duration(reservation.timestamp - $scope.clock).humanize(true);
                    }

                    for (index = 0; index < $scope.resources.length; ++index) {
                        var resource = $scope.resources[index];
                        resource.timeleft = moment.duration(resource.timestamp - $scope.clock).humanize(true);
                    }
                }

                var refreshReservations = function () {

                    return Reservation.query({
                        resourceId: $routeParams.id
                    }, function (data) {
                        $scope.reservations = data.reservations;
                        // Figure out if a meeting is in progress.
                        for (index = 0; index < data.reservations.length; ++index) {
                            var reservation = data.reservations[index];
                            if ((new Date(reservation.startDate) - new Date()) < 0) {
                                // It's an ongoing meeting.					
                                reservation.meetingState = "Ongoing meeting";
                                reservation.verb = "Ends";
                                reservation.meetingStateClass = "ongoing";
                                reservation.timestamp = new Date(reservation.endDate);
                                reservation.timeleft = moment.duration(reservation.timestamp - $scope.clock).humanize(true);
                            } else {
                                // It's an upcoming meeting.
                                reservation.meetingState = "Upcoming meeting";
                                reservation.verb = "Starts";
                                reservation.meetingStateClass = "upcoming";
                                reservation.timestamp = new Date(reservation.startDate);
                                reservation.timeleft = moment.duration(reservation.timestamp - $scope.clock).humanize(true);
                                console.log(data.reservations);
                            }
                        }
                    });
                }

                var result = refreshReservations();

                // Start the timer
                $timeout(tick, $scope.tickInterval);
                // Startar timer 2
                $timeout(tidkvar, $scope.tickInterval);
                setInterval(refreshReservations, 5000);

                //Resources 
                var refreshResources = function () {
                    return Resource.query({
                        resourceId: $routeParams.id
                    }, function (data) {
                        $scope.resource = data;
                    });
                }

                var result = refreshResources();
                setInterval(refreshResources, 5000);
     }]);


        function changeImage1() {
            document.getElementById("myImage7").src = "img/reportproj.png";
            document.getElementById("myImage1").src = "img/ReportedProjector.png";
        }

        function changeImage2() {
            document.getElementById("myImage8").src = "img/reportproj.png";
            document.getElementById("myImage2").src = "img/reportedWhiteBoard.png";
        }


        function changeImage3() {
            document.getElementById("myImage9").src = "img/reportproj.png";
            document.getElementById("myImage3").src = "img/reportedTV.png";
        }


        function changeImage4() {
            document.getElementById("myImage10").src = "img/reportproj.png";
            document.getElementById("myImage4").src = "img/reportphon.png";
        }


        function changeImage5() {
            document.getElementById("myImage11").src = "img/reportproj.png";
            document.getElementById("myImage5").src = "img/reportedlight.png";
        }

        function changeImage6() {
            document.getElementById("myImage12").src = "img/reportproj.png";
            document.getElementById("myImage6").src = "img/reportedQuestion.png";

        };