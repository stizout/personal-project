const response = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test('Should return all 37 items', function() {
    console.log(response)
    pm.expect(response.length).to.eql(37);
});





const response = pm.response.json();

pm.test('Should receive pets back', function() {
    pm.expect(response.length).to.eql(10)
})