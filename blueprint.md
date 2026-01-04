# Project Blueprint: Angular Product Lister

## Overview

This application will display a list of products from the dummyJSON API. Users can filter products by category, view product details in a modal, and navigate through the product list using pagination.

## Phase 1: Project Setup & API Client

*   **`blueprint.md`**: Create a `blueprint.md` file with the full project plan.
*   **File Cleanup**: Remove boilerplate files from `src/app` (e.g., `app.routes.ts`).
*   **Interfaces**: Create `product.interface.ts` to define the data structures for `Product` and the paginated `ProductResponse`.
*   **API Service**: Create `product.service.ts` to fetch categories and products from the dummyJSON API. This service will manage state for the current category, current page, and the list of products.
*   **Configuration**: Set up `provideHttpClient()` in `app.config.ts`.
*   **Build Check**: Run `ng build` to ensure the project compiles without errors.

## Phase 2: UI Implementation

*   **Main Component**: Update `app.component.ts` to be a standalone component using `OnPush` change detection.
*   **Category Filter**: Implement the category dropdown in the component's template, populated from the `ProductService`.
*   **Product List**: Create an HTML table to display the filtered list of products.
*   **Pagination**: Add pagination controls (Previous, Next, current page) to navigate through the product list.
*   **Styling**: Apply initial CSS for a clean and readable layout.
*   **Build Check**: Run `ng build` to verify correctness.

## Phase 3: Product Detail Modal

*   **Modal Logic**: Add a signal to `AppComponent` to hold the currently selected product's data.
*   **Modal UI**: Use an `@if` block in the template to display a modal overlay when a product is selected.
*   **Data Display**: Populate the modal with the detailed information for the selected product.
*   **Modal Interaction**: Implement logic to open the modal on product click and close it.
*   **Styling**: Style the modal for a good user experience.
*   **Build Check**: Run `ng build`.

## Phase 4: Final Touches

*   **Styling**: Apply modern CSS for a polished look and feel (e.g., shadows, transitions, better fonts).
*   **Responsive Design**: Ensure the application is mobile-friendly.
*   **Accessibility**: Review and implement a11y standards.
*   **Error Handling**: Add basic error handling for API requests in the service.

## Phase 5: Component Refactoring

*   **`ControlsComponent`**: Create a new `ControlsComponent` to encapsulate the category filter and pagination controls.
*   **`ProductTableComponent`**: Create a new `ProductTableComponent` to display the list of products.
*   **`ProductModalComponent`**: Create a new `ProductModalComponent` for the product details modal.
*   **Update `AppComponent`**: Refactor the `AppComponent` to act as a container, delegating responsibilities to the new child components.
*   **Build Check**: Run `ng build` to ensure the project compiles without errors.
