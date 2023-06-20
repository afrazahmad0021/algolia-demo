const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

const search = instantsearch({
  indexName: 'instant_search',
  searchClient,

});

search.addWidgets([
  instantsearch.widgets.clearRefinements({
    container: '#clear-refinements',
  }),

  instantsearch.widgets.refinementList({
    container: '#brand-list',
    attribute: 'brand',
  }),

  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <img src="{{image}}" align="left" alt="{{name}}" class="image-url" />
          <div class="hit-name">
            {{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}
          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}
          </div>
          <div class="hit-price">\${{price}}</div>
        </div>
      `,
    },
  }),

  instantsearch.widgets.configure({
    hitsPerPage: 5,
  }),
  // instantsearch.widgets.dynamicWidgets({
  //   container: '#dynamic-widgets',
  //   fallbackWidget({ container, attribute }) {
  //     return instantsearch.widgets.panel({ templates: { header: () => attribute } })(
  //       instantsearch.widgets.refinementList
  //     )({
  //       container,
  //       attribute,
  //     });
  //   },
  //   widgets: [
  //   ],
  // }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
