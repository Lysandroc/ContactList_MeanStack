var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
    
    var refresh = function() {
        $http.get('/contacts').then(function(response) {
            console.log('I got the data I requested');
            $scope.contacts = response.data;
            $scope.contact = "";
        }); 
    }; 
    
    refresh();
  
    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/contact',$scope.contact).then(function(response) {
            console.log(response);
            refresh(); 
        });
    };
    
    $scope.removeContact = function(id) {
        console.log(id);
        $http.delete('/contact/' + id).then(function(response) {
            console.log(response);
            refresh();
        });
    };
 
    $scope.editContact = function(id) {
        console.log(id);
        $http.get('/contact/'+ id).then(function(response) {
            console.log(response.data);
            $scope.contact = response.data;            
        });
    }; 
    
    $scope.updateContact = function() {
        console.log($scope.contact._id);
        $http.put('/contact/'+ $scope.contact._id, $scope.contact).then(function(response){
            refresh();
        });
    };
    
    $scope.clearContact = function() {
        $scope.contact = "";  
    };
  
    
});