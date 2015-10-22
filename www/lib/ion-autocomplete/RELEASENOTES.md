# Release notes of ion-autocomplete

## Version 0.2.3

* Tag: [0.2.3](https://github.com/guylabs/ion-autocomplete/tree/v0.2.3)
* Release: [ion-autocomplete-0.2.2.zip](https://github.com/guylabs/ion-autocomplete/archive/v0.2.3.zip)

### Changes

* Add new `model-to-item-method` to be able to prepopulate the model. (See issue [#25](https://github.com/guylabs/ion-autocomplete/issues/25))
* Fixed issue 'Feature: Loading icon' - [#12](https://github.com/guylabs/ion-autocomplete/issues/12).
* Fixed issue 'Bug: Cannot pass in pre-populated model' - [#25](https://github.com/guylabs/ion-autocomplete/issues/25).
* Fixed issue 'Bug: $http promise not working' - [#27](https://github.com/guylabs/ion-autocomplete/issues/27).
* Fixed issue 'Bug: Item list from variable won't show first time you start typing' - [#30](https://github.com/guylabs/ion-autocomplete/issues/30).
* Fixed issue 'Feature: No callback when items removed' - [#32](https://github.com/guylabs/ion-autocomplete/issues/32).
* Fixed issue 'Bug: JS error when using with jQuery' - [#34](https://github.com/guylabs/ion-autocomplete/issues/34).
* Fixed issue 'Feature: Display all items if query is empty' - [#38](https://github.com/guylabs/ion-autocomplete/issues/38).
* Fixed issue 'Feature: Ability to pass in arbitrary data to pass to the template' - [#39](https://github.com/guylabs/ion-autocomplete/issues/39).
* Fixed issue 'Feature: Autocomplete box should open on <tab> as well as click' - [#43](https://github.com/guylabs/ion-autocomplete/issues/43).

### Migration notes

* The query can now also be empty in the `items-method` and this could change the logic in your `items-method`. Please check [#38](https://github.com/guylabs/ion-autocomplete/issues/38) for more information.

## Version 0.2.2

* Tag: [0.2.2](https://github.com/guylabs/ion-autocomplete/tree/v0.2.2)
* Release: [ion-autocomplete-0.2.2.zip](https://github.com/guylabs/ion-autocomplete/archive/v0.2.2.zip)

### Changes

* Fixed issue 'Model binding issue' - [#14](https://github.com/guylabs/ion-autocomplete/issues/14).
* Fixed issue 'Upgrade to Ionic 1.0.0' - [#15](https://github.com/guylabs/ion-autocomplete/issues/15).
* Fixed issue 'Cant display list in from query' - [#16](https://github.com/guylabs/ion-autocomplete/issues/16).
* Fixed issue 'How can I call the auto complete form in the ng-click' - [#18](https://github.com/guylabs/ion-autocomplete/issues/18).
* Fixed issue 'I cant get autocomplete to work in my project' - [#21](https://github.com/guylabs/ion-autocomplete/issues/21).
* Fixed issue 'Add version table to documentation' - [#22](https://github.com/guylabs/ion-autocomplete/issues/22).
* Fixed issue 'Ability to pass sort of id to the item-method' - [#23](https://github.com/guylabs/ion-autocomplete/issues/23).

## Version 0.2.1

* Tag: [0.2.1](https://github.com/guylabs/ion-autocomplete/tree/v0.2.1)
* Release: [ion-autocomplete-0.2.1.zip](https://github.com/guylabs/ion-autocomplete/archive/v0.2.1.zip)

### Changes

* Fixed issue [#5](https://github.com/guylabs/ion-autocomplete/issues/5).
* Fixed issue [#6](https://github.com/guylabs/ion-autocomplete/issues/6).
* Fixed issue [#8](https://github.com/guylabs/ion-autocomplete/issues/8).
* Fixed issue [#10](https://github.com/guylabs/ion-autocomplete/issues/10).

## Version 0.2.0

* Tag: [0.2.0](https://github.com/guylabs/ion-autocomplete/tree/v0.2.0)
* Release: [ion-autocomplete-0.2.0.zip](https://github.com/guylabs/ion-autocomplete/archive/v0.2.0.zip)

### Changes

* Add the ability to select multiple items
* Add ability to pass in a callback function when an item is clicked
* Use `collection-repeat` instead of `ng-repeat` to improve the performance
* Add the ability to use an own external template

## Version 0.1.2

* Tag: [0.1.2](https://github.com/guylabs/ion-autocomplete/tree/v0.1.2)
* Release: [ion-autocomplete-0.1.2.zip](https://github.com/guylabs/ion-autocomplete/archive/v0.1.2.zip)

### Changes

* Fixed issue that the model was not shown if it was already populated
* Add ability to use expressions in the value keys

## Version 0.1.1

* Tag: [0.1.1](https://github.com/guylabs/ion-autocomplete/tree/v0.1.1)
* Release: [ion-autocomplete-0.1.0.zip](https://github.com/guylabs/ion-autocomplete/archive/v0.1.1.zip)

### Changes

* Fix release version

## Version 0.1.0

* Tag: [0.1.0](https://github.com/guylabs/ion-autocomplete/tree/v0.1.0)
* Release: [ion-autocomplete-0.1.0.zip](https://github.com/guylabs/ion-autocomplete/archive/v0.1.0.zip)

### Changes

* Add promise support for the items method
* Add `items-method-value-key` property to specify the value key of the data returned by the items method

## Version 0.0.2

* Tag: [0.1.0](https://github.com/guylabs/ion-autocomplete/tree/v0.0.2)
* Release: [ion-autocomplete-0.0.2.zip](https://github.com/guylabs/ion-autocomplete/archive/v0.0.2.zip)

### Changes

* Initial release of `ion-autocomplete`
