import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createBooking, getAllBookings, createInquiry, getAllInquiries } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Booking procedures
  bookings: router({
    /**
     * Create a new booking request from the public form
     */
    create: publicProcedure
      .input(
        z.object({
          pickupLocation: z.string().min(1, "Pickup location required"),
          dropoffLocation: z.string().min(1, "Drop-off location required"),
          bookingDate: z.string().min(1, "Date required"),
          bookingTime: z.string().min(1, "Time required"),
          passengers: z.number().int().min(1).max(8),
          serviceType: z.enum(["one-way", "return", "hourly"]),
          fullName: z.string().min(1, "Full name required"),
          email: z.string().min(5).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Valid email required"),
          phone: z.string().min(1, "Phone required"),
          specialRequests: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const booking = await createBooking({
            pickupLocation: input.pickupLocation,
            dropoffLocation: input.dropoffLocation,
            bookingDate: input.bookingDate,
            bookingTime: input.bookingTime,
            passengers: input.passengers,
            serviceType: input.serviceType,
            fullName: input.fullName,
            email: input.email,
            phone: input.phone,
            specialRequests: input.specialRequests || null,
            status: "pending",
          });

          if (booking) {
            // Notify owner of new booking
            await notifyOwner({
              title: "New Booking Request",
              content: `New booking from ${input.fullName}\n\nPickup: ${input.pickupLocation}\nDrop-off: ${input.dropoffLocation}\nDate: ${input.bookingDate} at ${input.bookingTime}\nPassengers: ${input.passengers}\nEmail: ${input.email}\nPhone: ${input.phone}`,
            });
          }

          return {
            success: true,
            bookingId: booking?.id,
            message: "Booking request submitted successfully. We'll contact you shortly.",
          };
        } catch (error) {
          console.error("Booking creation error:", error);
          throw new Error("Failed to create booking");
        }
      }),

    /**
     * Get all bookings (admin only)
     */
    list: publicProcedure.query(async () => {
      try {
        return await getAllBookings();
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        return [];
      }
    }),
  }),

  // Inquiry procedures
  inquiries: router({
    /**
     * Create a new inquiry from the contact form
     */
    create: publicProcedure
      .input(
        z.object({
          fullName: z.string().min(1, "Full name required"),
          email: z.string().min(5).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Valid email required"),
          phone: z.string().optional(),
          subject: z.string().min(1, "Subject required"),
          message: z.string().min(1, "Message required"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const inquiry = await createInquiry({
            fullName: input.fullName,
            email: input.email,
            phone: input.phone || null,
            subject: input.subject,
            message: input.message,
            status: "new",
          });

          if (inquiry) {
            // Notify owner of new inquiry
            await notifyOwner({
              title: "New Contact Inquiry",
              content: `New inquiry from ${input.fullName}\n\nSubject: ${input.subject}\nEmail: ${input.email}\nPhone: ${input.phone || "Not provided"}\n\nMessage:\n${input.message}`,
            });
          }

          return {
            success: true,
            inquiryId: inquiry?.id,
            message: "Thank you for your inquiry. We'll get back to you soon.",
          };
        } catch (error) {
          console.error("Inquiry creation error:", error);
          throw new Error("Failed to create inquiry");
        }
      }),

    /**
     * Get all inquiries (admin only)
     */
    list: publicProcedure.query(async () => {
      try {
        return await getAllInquiries();
      } catch (error) {
        console.error("Failed to fetch inquiries:", error);
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
