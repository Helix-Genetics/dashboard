export interface IOrderChart {
    count: number;
    status:
        | "waiting"
        | "ready"
        | "on the way"
        | "delivered"
        | "could not be delivered";
}

export interface IOrderTotalCount {
    total: number;
    totalDelivered: number;
}

export interface ISalesChart {
    date: string;
    title: "Order Count" | "Order Amount";
    value: number;
}

export interface IOrderStatus {
    id: number;
    text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
}

export interface IUser {


    id: string

    avatar: string
    is_active: boolean


    first_name: string


    middle_name: string


    last_names: string

    password: string


    username: string


    phone_number: string


    role_id: string

    email: string


    created_at: Date


    updated_at: Date
}

export interface IIdentity {
    id: number;
    name: string;
    avatar: string;
}

export interface IAddress {
    text: string;
    coordinate: [string, string];
}

export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

export interface IEvent {
    date: string;
    status: string;
}

export interface IStore {
    id: number;
    gsm: string;
    email: string;
    title: string;
    isActive: boolean;
    createdAt: string;
    address: IAddress;
    products: IProduct[];
}

export interface ICourier {
    id: number;
    name: string;
    surname: string;
    email: string;
    gender: string;
    gsm: string;
    createdAt: string;
    accountNumber: string;
    licensePlate: string;
    address: string;
    avatar: IFile[];
    store: IStore;
}
export interface IOrder {
    id: number;
    user: IUser;
    createdAt: string;
    products: IProduct[];
    status: IOrderStatus;
    adress: IAddress;
    store: IStore;
    courier: ICourier;
    events: IEvent[];
    orderNumber: number;
    amount: number;
}

export interface IProduct {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    images: IFile[];
    createdAt: string;
    price: number;
    category: ICategory;
    stock: number;
}

export interface ICategory {
    id: number;
    title: string;
    isActive: boolean;
}

export interface IOrderFilterVariables {
    q?: string;
    store?: string;
    user?: string;
    status?: string[];
}

export interface IUserFilterVariables {
    q: string;
    status: boolean;
    gender: string;
    isActive: boolean | string;
}

export interface ICarFilterVariables {
    q: string,
    make: string
    model: string
    color: string
    year: number
    mileage: number
}

export interface ICourier {
    id: number;
    name: string;
    surname: string;
    gender: string;
    gsm: string;
    createdAt: string;
    isActive: boolean;
    avatar: IFile[];
}

export interface IReview {
    id: string;
    owner_id: string;
    rating: number;
    created_at: string;
    updated_at: string
    status: "pending" | "approved" | "rejected";
    comment: string[];
}
export interface ILocation {

}
export interface IDocument {}
export interface IUserVerification {}
export interface ICarVerification {
    id: string
    car: ICar
    verification: IVerification
    verification_id: string
    created_at: string
    updated_at: string
}
export interface IUserVerification {}
export interface ICarReview {
    id: string
    car: ICar
    car_id: string
    review: IReview
    review_id: string
    created_at: string
    updated_at: string
}
export interface ITransaction {}
export interface IVerification {
    id: string
    status: boolean

    verification_type: string
    documents:  IDocument[]
    car_verifications: ICarVerification[]
    user_verifications: IUserVerification[]
    created_at: string
    updated_at: string
}
export interface IReservation {
    id: string
    start_date: string
    end_date: string
    price: number
    total: number
    status: string
    user: IUser
    car: ICar
    transactions: ITransaction[]
    user_id: string
    car_id: string
    created_at: string
    updated_at: string
}
export interface IFeature {
    id: string
    name: string
    description: string
    status: boolean
    car: ICar
    car_id: string
    created_at: string
    updated_at: string
}
export interface IPreference {}
export interface ICar {
    id: string
    make: string
    model: string
    color: string
    year: number
    mileage: number
    owner: IUser
    owner_id: string
    location: ILocation
    location_id: string
    verifications: ICarVerification[]
    reservations: IReservation[]
    reviews:  ICarReview[]
    features: IFeature[]
    preferences: IPreference[]
    created_at: string
    updated_at: string
}
/*
enum TransactionStatus {
    pending
posted
void
}
enum AddressType {
    HOME
OFFICE
BUSINESS
BILLING
SHIPPING
CONTRACT
RECEIVABLE
RECIPIENT
}
enum ReviewStatus {
    pending
approved
rejected
}
model Permission {
    id        String           @id @default(uuid())
    action    String
    condition Json?
      object_id String?
        roles     RolePermission[]
}

model Role {
    id          String           @id @default(uuid())
    name        String
    permissions RolePermission[]
    user        User[]
}

// Roles -> (Has Many Through) <- Permissions
model RolePermission {
    role          Role       @relation(fields: [role_id], references: [id])
    role_id       String
    permission    Permission @relation(fields: [permission_id], references: [id])
    permission_id String
    // double check if columns below are needed below
    assigned_by   String
    assigned_at   DateTime   @default(now())

@@id([role_id, permission_id])
}

model User {
    id           String        @id @default(uuid())
    first_name   String
    middle_name  String
    last_names   String
    email        String        @unique()
    phone_number String
    username     String        @unique()
    password     String
    is_active Boolean @default(true)
    avatar String?
      role         Role?         @relation(fields: [role_id], references: [id])
    role_id      String
    cars         Car[]
    verifications UserVerification[]
    reviews_made Review[]
    reviews_received UserReview[]
    account Account?
      reservations Reservation[]
    addresses Address[]
    created_at   DateTime      @default(now())
    updated_at   DateTime      @default(now())
}

model Car {
    id  String @id @default(uuid())
    make  String
    model String
    color String
    year  Int
    mileage Int
    owner User @relation(fields: [owner_id], references: [id])
    owner_id  String
    location Location @relation(fields: [location_id], references: [id])
    location_id String @unique
    verifications CarVerification[]
    reservations Reservation[]
    reviews CarReview[]
    features Feature[]
    preferences Preference[]
    created_at    DateTime @default(now())
    updated_at    DateTime @default(now())
}

model Location {
    id          String   @id @default(uuid())
    city        String
    locality    String
    description String
    latitude    Decimal
    longitude   Decimal
    car         Car?
      created_at  DateTime @default(now())
    updated_at  DateTime @default(now())
}

model Verification {
    id                String   @id @default(uuid())
    status            String
    verification_type String
    documents Document[]
    car_verifications CarVerification[]
    user_verifications UserVerification[]
    created_at    DateTime @default(now())
    updated_at   DateTime @default(now())
}

model Document {
    id String @id @default(uuid())
    type String
    description String
    status String
    url String
    verification Verification @relation(fields: [verification_id], references: [id])
    verification_id String
    created_at    DateTime @default(now())
    updated_at   DateTime @default(now())
}

model Reservation {
    id         String   @id @default(uuid())
    start_date DateTime
    end_date   DateTime
    price      Int
    total      Int
    status     String
    user       User     @relation(fields: [user_id], references: [id])
    car        Car      @relation(fields: [car_id], references: [id])
    transactions Transaction[]
    user_id    String
    car_id     String
    created_at DateTime @default(now())
    updated_at DateTime @default(now())
}

model UserVerification {
    id  String @id @default(uuid())
    user User @relation(fields: [user_id], references: [id])
    user_id String
    verification Verification @relation(fields: [verification_id], references: [id])
    verification_id String
    created_at    DateTime @default(now())
    updated_at   DateTime @default(now())
}


model UserReview {
    id  String @id @default(uuid())
    user User @relation(fields: [user_id], references: [id])
    user_id String
    review Review @relation(fields: [review_id], references: [id])
    review_id String
    created_at    DateTime @default(now())
    updated_at   DateTime @default(now())
}
model Feature {
    id  String @id @default(uuid())
    name String
    description String
    status Boolean
    car Car @relation(fields: [car_id], references: [id])
    car_id String
    created_at    DateTime @default(now())
    updated_at   DateTime @default(now())
}
model Preference {
    id  String @id @default(uuid())
    name String
    description String
    status Boolean @default(true)
    car Car @relation(fields: [car_id], references: [id])
    car_id String
    created_at    DateTime @default(now())
    updated_at   DateTime @default(now())
}
model Transaction {
    id  String @id @default(uuid())
    amount Int
    description String
    currency String
    status  TransactionStatus
    account Account @relation(fields: [account_id], references: [id])
    account_id String
    reservation Reservation @relation(fields: [reservation_id], references: [id])
    reservation_id String
    created_at    DateTime @default(now()) @db.Timestamp()
}
model Account {
    id  String @id @default(uuid())
    display_name String
    institution_name String
    account_holder User @relation(fields: [account_holder_id], references: [id])
    account_holder_id String @unique
    category String
    subcategory String
    status String
    method_type String
    finantial_connection_id String
    transactions Transaction[]
    created_at    DateTime @default(now())
    updated_at   DateTime @default(now())
}
model Address {
    id  String @id @default(uuid())
    type AddressType
    address1 String
    address2 String?
      city String
    state String
    zip_code String
    normalized String
    user User @relation(fields: [user_id], references: [id])
    user_id String
    created_at    DateTime @default(now())
    updated_at   DateTime @default(now())
}
*/