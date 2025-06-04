**Frontend**

[x] Navbar dropdown menu
[x] categories page
[x] categories/name page
[x] list_detail page
[x] add listing form
[x] zod validation
[x] admin page
[x] auth
[x] update hero section
[x] add the list table on admin page & profile page
[x] Show all listings in admin page
[x] Show all user in admin page
[x] integrate with tanstack query
[] toast

**Backend**

[x] Database migration
[x] setup database
[x] api CRUD
[x] integration with clerk
[x] api for add listing and edit
[x] API for user

**Design**
[] Database Design
[] System Design

## Database Design

```mermaid
erDiagram
    USER {
        string id PK
        string name
        string email
        string password_hash
        string role
        datetime created_at
        datetime updated_at
    }

    LISTING {
        string id PK
        string name
        string category FK
        string description
        string address
        string phone
        string url
        string hours
        string image
        string owner_id FK
        boolean is_approved
        datetime created_at
        datetime updated_at
    }

    CATEGORY {
        string id PK
        string name
        string description
        string image
        datetime created_at
        datetime updated_at
    }

    REVIEW {
        string id PK
        string listing_id FK
        string user_id FK
        int rating
        string comment
        datetime created_at
        datetime updated_at
    }

    FAVORITE {
        string id PK
        string user_id FK
        string listing_id FK
        datetime created_at
    }

    USER ||--o{ LISTING : "owns"
    USER ||--o{ REVIEW : "writes"
    USER ||--o{ FAVORITE : "saves"
    LISTING ||--o{ REVIEW : "receives"
    LISTING }o--|| CATEGORY : "belongs_to"
    FAVORITE }o--|| LISTING : "references"
```

## System Architecture

```mermaid
flowchart TB
    subgraph Client
        WebApp["Web Application"]
        MobileApp["Mobile Application"]
    end

    subgraph Frontend
        UI["User Interface"]
        Pages["Pages"]
        Components["Components"]
        StateManagement["State Management"]
        Authentication["Authentication (Clerk)"]
    end

    subgraph Backend
        API["API Layer"]
        Controllers["Controllers"]
        Services["Business Logic"]
        Validators["Validation Layer (Zod)"]
    end

    subgraph Database
        DB[(Database)]
        Migrations["Migrations"]
    end

    subgraph ExternalServices
        ClerkAuth["Clerk Authentication"]
        ImageStorage["Image Storage"]
    end

    Client --> Frontend
    Frontend --> Backend
    Backend --> Database
    Backend <--> ExternalServices
    Frontend <--> ExternalServices
```

## User Flow Diagram

```mermaid
stateDiagram-v2
    [*] --> Homepage
    Homepage --> BrowseCategories: View all categories
    Homepage --> Authentication: Login/Signup
    Homepage --> SearchListings: Search for listings

    Authentication --> UserProfile: Successful login
    Authentication --> AdminDashboard: Login as admin

    BrowseCategories --> CategoryDetail: Select category
    CategoryDetail --> ListingDetail: Select listing

    SearchListings --> ListingDetail: Select search result

    UserProfile --> ManageListings: View my listings
    UserProfile --> ViewFavorites: View saved listings
    UserProfile --> AddListing: Create new listing

    ManageListings --> EditListing: Update listing
    ManageListings --> DeleteListing: Remove listing

    AddListing --> ListingDetail: Listing created
    EditListing --> ListingDetail: Listing updated

    AdminDashboard --> ManageAllListings: View all listings
    AdminDashboard --> ManageCategories: Manage categories
    AdminDashboard --> ManageUsers: Manage users

    ManageAllListings --> ApproveListing: Approve/reject listing
    ManageCategories --> AddCategory: Create category
    ManageCategories --> EditCategory: Update category
    ManageCategories --> DeleteCategory: Remove category

    ListingDetail --> AddReview: Write review
    ListingDetail --> SaveToFavorites: Add to favorites

    ListingDetail --> [*]
    UserProfile --> [*]
    AdminDashboard --> [*]
```

## Data Flow Diagram

```mermaid
flowchart TD
    User([User])
    Admin([Admin])

    subgraph System
        Auth["Authentication"]
        ListingManagement["Listing Management"]
        CategoryManagement["Category Management"]
        UserManagement["User Management"]
        ReviewSystem["Review System"]
        FavoriteSystem["Favorite Management"]
        SearchEngine["Search Engine"]
    end

    subgraph Database
        UserDB[(User Data)]
        ListingDB[(Listing Data)]
        CategoryDB[(Category Data)]
        ReviewDB[(Review Data)]
        FavoriteDB[(Favorite Data)]
    end

    User -->|Login/Register| Auth
    Admin -->|Login| Auth

    Auth -->|Validate| UserDB

    User -->|Create/View/Edit Listings| ListingManagement
    User -->|Browse Categories| CategoryManagement
    User -->|Write Reviews| ReviewSystem
    User -->|Save Favorites| FavoriteSystem
    User -->|Search| SearchEngine

    Admin -->|Manage Listings| ListingManagement
    Admin -->|Manage Categories| CategoryManagement
    Admin -->|Manage Users| UserManagement

    ListingManagement <-->|CRUD Operations| ListingDB
    CategoryManagement <-->|CRUD Operations| CategoryDB
    UserManagement <-->|CRUD Operations| UserDB
    ReviewSystem <-->|CRUD Operations| ReviewDB
    FavoriteSystem <-->|CRUD Operations| FavoriteDB

    SearchEngine -->|Query| ListingDB
    SearchEngine -->|Query| CategoryDB
```

## Deployment Architecture

```mermaid
flowchart TB
    subgraph Users
        Client([Client Browsers/Apps])
    end

    subgraph CloudInfrastructure
        subgraph FrontendHosting
            StaticSite["Static Site (Next.js)"]
            CDN["Content Delivery Network"]
        end

        subgraph BackendServices
            API["API Server"]
            AuthService["Authentication Service"]
            StorageService["File Storage Service"]
        end

        subgraph DatabaseLayer
            MainDB[(Main Database)]
            CacheDB[(Cache Database)]
        end
    end

    Client --> CDN
    CDN --> StaticSite
    StaticSite --> API
    API --> AuthService
    API --> StorageService
    API --> MainDB
    API --> CacheDB
```
