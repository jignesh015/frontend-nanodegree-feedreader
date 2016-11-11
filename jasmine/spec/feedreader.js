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
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This test is to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL defined', function() {
            var urlLen;
            allFeeds.forEach(function(feed) {
                urlLen = feed.url.length;
                expect(feed.url).toBeDefined();
                expect(urlLen).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name defined', function() {
            var nameLen;
            allFeeds.forEach(function(feed) {
                nameLen = feed.name.length;
                expect(feed.name).toBeDefined();
                expect(nameLen).not.toBe(0);
            });
        });
    });


    /* This test suite contains tests for the menu element */
    describe('The menu', function() {
        var bodyClass = $('body').hasClass('menu-hidden');

        /* This test ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function() {
            expect(bodyClass).toBe(true);
        });

        /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        
        it('changes when icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            var check1 = $("body").hasClass('menu-hidden');
            expect(check1).toBe(false);

            $('.menu-icon-link').trigger('click');
            var check2 = $("body").hasClass('menu-hidden');
            expect(check2).toBe(true);
        });
    });

    /* This test suite contains test for loading the Initial Entries */
    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are loaded in feed container', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* This test suite contains test for loading new feed */
    describe('New Feed Selection', function() {
        var previousContent,
            currentContent;

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                previousContent = $('.feed .entry').html();
                loadFeed(1, function() {
                    currentContent = $('.feed .entry').html();
                    done();
                });
            });
            
        });

        it('changes content', function() {
            expect(previousContent).not.toEqual(currentContent);
        });
    });
}());
