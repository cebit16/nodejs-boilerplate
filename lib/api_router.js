'use strict';

const db = require('./db'),
	router = module.exports = require('express').Router();


/*
* Have a look at app.js and see how we integrated this router.
* All paths defined here are prepended by '/api'
*/
router.get('/dummy', (req, res) => {
	db.exec('select * from dummy', (err, rows) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(rows);
		}
	});
});

router.get('/vehicles', (req, res) => {
	db.exec('select * from "SAP_VEAN"."cebit.views::Vehicle"', (err, rows) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(rows);
		}
	});
});

router.get('/vehicles/:vehicleId/trips', (req, res) => {
	db.prepare(`select * from "SAP_VEAN"."cebit.views::TripSegment" where "VehicleID" = ?`, (err, stmt) => {
		if (err) {
			return res.status(500).json(err);
		}

		stmt.exec([req.params.vehicleId], (err, rows) => {
			if (err) {
				res.status(500).json(err);
			} else {
				res.json(rows);
			}
		});
	});
});

router.get('/vehicles/:vehicleId/properties', (req, res) => {
	db.prepare(`select "ID", "PhysicalProperty", "UnitOfMeasure", "Label" from "SAP_VEAN"."cebit.views::Property" where "ID" in (
		select distinct("PropertyID") from "SAP_VEAN"."cebit.views::TimeSeriesItem" where "VehicleID" = ?
		)`, (err, stmt) => {
		if (err) {
			return res.status(500).json(err);
		}

		stmt.exec([req.params.vehicleId], (err, rows) => {
			if (err) {
				res.status(500).json(err);
			} else {
				res.json(rows);
			}
		});
	});
});

router.get('/vehicles/:vehicleId/time/:timestamp', (req, res) => {
	db.prepare(`
		select tsi.* from "SAP_VEAN"."cebit.views::TimeSeriesItem" tsi
			join "SAP_VEAN"."cebit.views::Property" prop
				on tsi."PropertyID" = prop."ID"
				and tsi."VehicleID" = ?
				and tsi."Timestamp" = ?
		`, (err, stmt) => {
		if (err) {
			return res.status(500).json(err);
		}

		stmt.exec([req.params.vehicleId, req.params.timestamp], (err, rows) => {
			if (err) {
				res.status(500).json(err);
			} else {
				res.json(rows);
			}
		});
	});
});

router.get('/vehicles/:vehicleId/trips/:startTimestamp/properties/:propertyId', (req, res) => {
	db.prepare(`
		select * from "SAP_VEAN"."cebit.views::TimeSeriesItem"
			where "VehicleID" = ?
				and "PropertyID" = ?
				and "Timestamp" between
					?
					and
					(select "EndTimestamp" from "SAP_VEAN"."cebit.views::TripSegment"
						where "VehicleID" = ?
						and "StartTimestamp" = ?
					)
		`, (err, stmt) => {
		if (err) {
			return res.status(500).json(err);
		}

		stmt.exec([
			req.params.vehicleId,
			req.params.propertyId,
			req.params.startTimestamp,
			req.params.vehicleId,
			req.params.startTimestamp
		], (err, rows) => {
			if (err) {
				res.status(500).json(err);
			} else {
				res.json(rows);
			}
		});
	});
});