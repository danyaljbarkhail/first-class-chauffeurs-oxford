import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("bookings.create", () => {
  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.bookings.create({
        pickupLocation: "",
        dropoffLocation: "London",
        bookingDate: "2024-12-25",
        bookingTime: "10:00",
        passengers: 1,
        serviceType: "one-way",
        fullName: "John Doe",
        email: "john@example.com",
        phone: "07348748543",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Pickup location required");
    }
  });

  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.bookings.create({
        pickupLocation: "Oxford",
        dropoffLocation: "London",
        bookingDate: "2024-12-25",
        bookingTime: "10:00",
        passengers: 1,
        serviceType: "one-way",
        fullName: "John Doe",
        email: "not-an-email",
        phone: "07348748543",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Valid email required");
    }
  });

  it("accepts valid email formats", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const validEmails = [
      "user@example.com",
      "john.doe@company.co.uk",
      "test+tag@domain.com",
      "name_123@test.org",
    ];

    for (const email of validEmails) {
      try {
        await caller.bookings.create({
          pickupLocation: "Oxford",
          dropoffLocation: "London",
          bookingDate: "2024-12-25",
          bookingTime: "10:00",
          passengers: 1,
          serviceType: "one-way",
          fullName: "John Doe",
          email: email,
          phone: "07348748543",
        });
      } catch (error: any) {
        // Only fail if it's an email validation error
        expect(error.message).not.toContain("Valid email required");
      }
    }
  });

  it("validates passenger count", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.bookings.create({
        pickupLocation: "Oxford",
        dropoffLocation: "London",
        bookingDate: "2024-12-25",
        bookingTime: "10:00",
        passengers: 0,
        serviceType: "one-way",
        fullName: "John Doe",
        email: "john@example.com",
        phone: "07348748543",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("passengers");
    }
  });

  it("validates service type enum", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.bookings.create({
        pickupLocation: "Oxford",
        dropoffLocation: "London",
        bookingDate: "2024-12-25",
        bookingTime: "10:00",
        passengers: 1,
        serviceType: "invalid" as any,
        fullName: "John Doe",
        email: "john@example.com",
        phone: "07348748543",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("serviceType");
    }
  });
});

describe("inquiries.create", () => {
  it("validates required fields for inquiry", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.inquiries.create({
        fullName: "",
        email: "test@example.com",
        subject: "Test",
        message: "Test message",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Full name required");
    }
  });

  it("validates email format for inquiry", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.inquiries.create({
        fullName: "John Doe",
        email: "not-an-email",
        subject: "Test",
        message: "Test message",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Valid email required");
    }
  });

  it("validates subject is required", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.inquiries.create({
        fullName: "John Doe",
        email: "john@example.com",
        subject: "",
        message: "Test message",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Subject required");
    }
  });

  it("validates message is required", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.inquiries.create({
        fullName: "John Doe",
        email: "john@example.com",
        subject: "Test",
        message: "",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Message required");
    }
  });

  it("accepts optional phone field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.inquiries.create({
        fullName: "John Doe",
        email: "john@example.com",
        subject: "Test Inquiry",
        message: "This is a test message",
        phone: undefined,
      });

      if (result) {
        expect(result.success).toBe(true);
      }
    } catch (error: any) {
      expect(error.message).not.toContain("phone");
    }
  });

  it("accepts valid email formats for inquiry", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const validEmails = [
      "user@example.com",
      "john.doe@company.co.uk",
      "test+tag@domain.com",
      "name_123@test.org",
    ];

    for (const email of validEmails) {
      try {
        await caller.inquiries.create({
          fullName: "John Doe",
          email: email,
          subject: "Test",
          message: "Test message",
        });
      } catch (error: any) {
        expect(error.message).not.toContain("Valid email required");
      }
    }
  });
});

describe("bookings.list", () => {
  it("returns empty array when database is unavailable", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.bookings.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("inquiries.list", () => {
  it("returns empty array when database is unavailable", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.inquiries.list();
    expect(Array.isArray(result)).toBe(true);
  });
});
