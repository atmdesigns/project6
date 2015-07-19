/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined,
         * that the URL is not empty, and it contains 'http'.
         */
        allFeeds.forEach(function(allFeeds) {
           var testurl = "http://thisisaurl"
            it('are defined', function() {
                expect(allFeeds.url).toBeDefined();
                expect(allFeeds.url).not.toBeNull();
                expect(allFeeds.url).toMatch(/http/);
            });
        });
        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined,
         * and that the name is not empty.
         */
        allFeeds.forEach(function(allFeeds) {
            it('are defined', function() {
                expect(allFeeds.name).toBeDefined();
                expect(allFeeds.name).not.toBeNull();
            });
        });

    }); // This ends the RSS Feeds suite of tests
    
    describe ('The menu', function() {
        /* This is our second test suite.  It tests to make sure that
        the menu is hidden by default and that clicking the menu toggles
        its visibility.*/    
        
        /* This test ensures the menu element is
         * hidden by default. */
        it('hides menu by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
        /* This test ensures the menu changes */
        it('ensure menu toggles', function(done) {
            $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
                done();
            $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
                done();
        });
    }); // This ends the Menu suite of tests

    /* This is our third test suite named "Initial Entries".  It ensures there
    is at least one entry in the feed container.    
     */
    describe ('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done){
            loadFeed(0,done);
        });
        it('should have at least 1 entry in the feed', function(done) {
            expect($('.feed').children().length).not.toBe(0);
            done();
        });
    }); // This ends the Initial Entries test suite.

     /* This is our fourth test suite named "New Feed Selection" */
    describe ('New Feed Selection', function() {
         /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done){
            //Load feeds and get the content to compare
            loadFeed(0, function() {
                title = $(".feed .entry h2").html();
                header = $("h1.header-title").html();
            loadFeed(1, function() {
                    done();
                });
            });
        });
        
        it('ensures title content changes after new feed is loaded', function(done) {
            //compare the titles
            expect($(".feed .entry h2").html()).not.toMatch(title);
            done();
        });
        it('ensures header content changes after new feed is loaded', function(done) {
            //compare the headers
            expect($("h1.header-title").html()).not.toMatch(header);
            done();
        });
    }); // This ends the New Feed Selection test suite.
}());
